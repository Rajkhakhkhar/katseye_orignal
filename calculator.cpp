#define UNICODE
#define _UNICODE
#include <windows.h>
#include <commctrl.h>
#include <cwchar>
#include <sstream>
#include <iomanip>
#include <cmath>

namespace {
constexpr int ID_FIRST = 101, ID_OPERATION = 102, ID_SECOND = 103, ID_CALCULATE = 104, ID_CLEAR = 105;
HWND firstNumber, secondNumber, operationBox, resultText, detailText;
HFONT titleFont, bodyFont, resultFont, labelFont;
HBRUSH panelBrush, fieldBrush;

double Calculate(double first, double second, int operation) {
    switch (operation) {
        case 0: return first + second;
        case 1: return first - second;
        case 2: return first * second;
        case 3: return first / second;
        case 4: return std::fmod(first, second);
        default: return std::pow(first, second);
    }
}

bool ReadNumber(HWND field, double& value) {
    wchar_t text[128]; GetWindowText(field, text, 128);
    wchar_t* end = nullptr; value = std::wcstod(text, &end);
    return end != text && *end == L'\0';
}

void SetText(HWND control, const std::wstring& text) { SetWindowText(control, text.c_str()); }

void RunCalculation() {
    double first, second;
    if (!ReadNumber(firstNumber, first) || !ReadNumber(secondNumber, second)) {
        SetText(detailText, L"Please enter valid numbers."); return;
    }
    const int operation = static_cast<int>(SendMessage(operationBox, CB_GETCURSEL, 0, 0));
    if (operation == 3 && second == 0) { SetText(detailText, L"Cannot divide by zero"); return; }

    const double answer = Calculate(first, second, operation);
    if (!std::isfinite(answer)) { SetText(detailText, L"Result is too large"); return; }
    std::wostringstream out; out << std::setprecision(12) << answer;
    SetText(resultText, out.str());
    const wchar_t* symbols[] = { L"+", L"−", L"×", L"÷", L"%", L"^" };
    std::wostringstream detail; detail << first << L" " << symbols[operation] << L" " << second;
    SetText(detailText, detail.str());
}

void ClearFields() {
    SetWindowText(firstNumber, L""); SetWindowText(secondNumber, L"");
    SendMessage(operationBox, CB_SETCURSEL, 0, 0);
    SetText(resultText, L"0"); SetText(detailText, L"Ready when you are");
    SetFocus(firstNumber);
}

HWND MakeLabel(HWND parent, const wchar_t* text, int x, int y, int w) {
    HWND label = CreateWindow(L"STATIC", text, WS_CHILD | WS_VISIBLE, x, y, w, 18, parent, nullptr, nullptr, nullptr);
    SendMessage(label, WM_SETFONT, reinterpret_cast<WPARAM>(labelFont), TRUE); return label;
}

LRESULT CALLBACK WindowProc(HWND window, UINT message, WPARAM wParam, LPARAM lParam) {
    switch (message) {
        case WM_CREATE: {
            titleFont = CreateFont(-32, 0, 0, 0, FW_BOLD, FALSE, FALSE, FALSE, DEFAULT_CHARSET, OUT_DEFAULT_PRECIS, CLIP_DEFAULT_PRECIS, CLEARTYPE_QUALITY, DEFAULT_PITCH, L"Segoe UI");
            bodyFont = CreateFont(-17, 0, 0, 0, FW_NORMAL, FALSE, FALSE, FALSE, DEFAULT_CHARSET, OUT_DEFAULT_PRECIS, CLIP_DEFAULT_PRECIS, CLEARTYPE_QUALITY, DEFAULT_PITCH, L"Segoe UI");
            resultFont = CreateFont(-62, 0, 0, 0, FW_SEMIBOLD, FALSE, FALSE, FALSE, DEFAULT_CHARSET, OUT_DEFAULT_PRECIS, CLIP_DEFAULT_PRECIS, CLEARTYPE_QUALITY, DEFAULT_PITCH, L"Segoe UI");
            labelFont = CreateFont(-11, 0, 0, 0, FW_BOLD, FALSE, FALSE, FALSE, DEFAULT_CHARSET, OUT_DEFAULT_PRECIS, CLIP_DEFAULT_PRECIS, CLEARTYPE_QUALITY, DEFAULT_PITCH, L"Consolas");
            panelBrush = CreateSolidBrush(RGB(25, 40, 34)); fieldBrush = CreateSolidBrush(RGB(36, 54, 46));
            HWND title = CreateWindow(L"STATIC", L"acalc", WS_CHILD | WS_VISIBLE, 42, 35, 240, 42, window, nullptr, nullptr, nullptr);
            SendMessage(title, WM_SETFONT, reinterpret_cast<WPARAM>(titleFont), TRUE);
            HWND subtitle = CreateWindow(L"STATIC", L"SIMPLE MATH, BEAUTIFULLY MADE", WS_CHILD | WS_VISIBLE, 43, 77, 300, 20, window, nullptr, nullptr, nullptr);
            SendMessage(subtitle, WM_SETFONT, reinterpret_cast<WPARAM>(labelFont), TRUE);
            MakeLabel(window, L"RESULT", 42, 126, 100);
            resultText = CreateWindow(L"STATIC", L"0", WS_CHILD | WS_VISIBLE | SS_RIGHT, 42, 146, 536, 70, window, nullptr, nullptr, nullptr);
            SendMessage(resultText, WM_SETFONT, reinterpret_cast<WPARAM>(resultFont), TRUE);
            detailText = CreateWindow(L"STATIC", L"Ready when you are", WS_CHILD | WS_VISIBLE | SS_RIGHT, 42, 218, 536, 25, window, nullptr, nullptr, nullptr);
            SendMessage(detailText, WM_SETFONT, reinterpret_cast<WPARAM>(labelFont), TRUE);
            MakeLabel(window, L"FIRST NUMBER", 42, 285, 150);
            MakeLabel(window, L"OPERATION", 237, 285, 150);
            MakeLabel(window, L"SECOND NUMBER", 432, 285, 150);
            firstNumber = CreateWindowEx(WS_EX_CLIENTEDGE, L"EDIT", L"", WS_CHILD | WS_VISIBLE | ES_AUTOHSCROLL, 42, 307, 172, 48, window, reinterpret_cast<HMENU>(ID_FIRST), nullptr, nullptr);
            operationBox = CreateWindow(L"COMBOBOX", L"", WS_CHILD | WS_VISIBLE | CBS_DROPDOWNLIST, 237, 307, 172, 220, window, reinterpret_cast<HMENU>(ID_OPERATION), nullptr, nullptr);
            secondNumber = CreateWindowEx(WS_EX_CLIENTEDGE, L"EDIT", L"", WS_CHILD | WS_VISIBLE | ES_AUTOHSCROLL, 432, 307, 172, 48, window, reinterpret_cast<HMENU>(ID_SECOND), nullptr, nullptr);
            const wchar_t* choices[] = { L"+  Addition", L"−  Subtraction", L"×  Multiplication", L"÷  Division", L"%  Modulus", L"^  Exponentiation" };
            for (const auto choice : choices) SendMessage(operationBox, CB_ADDSTRING, 0, reinterpret_cast<LPARAM>(choice));
            SendMessage(operationBox, CB_SETCURSEL, 0, 0);
            for (HWND control : { firstNumber, operationBox, secondNumber }) SendMessage(control, WM_SETFONT, reinterpret_cast<WPARAM>(bodyFont), TRUE);
            HWND clear = CreateWindow(L"BUTTON", L"Clear", WS_CHILD | WS_VISIBLE | BS_PUSHBUTTON, 42, 383, 172, 52, window, reinterpret_cast<HMENU>(ID_CLEAR), nullptr, nullptr);
            HWND calculate = CreateWindow(L"BUTTON", L"Calculate   ↵", WS_CHILD | WS_VISIBLE | BS_PUSHBUTTON, 237, 383, 367, 52, window, reinterpret_cast<HMENU>(ID_CALCULATE), nullptr, nullptr);
            SendMessage(clear, WM_SETFONT, reinterpret_cast<WPARAM>(bodyFont), TRUE); SendMessage(calculate, WM_SETFONT, reinterpret_cast<WPARAM>(bodyFont), TRUE);
            return 0;
        }
        case WM_COMMAND:
            if (LOWORD(wParam) == ID_CALCULATE) RunCalculation();
            if (LOWORD(wParam) == ID_CLEAR) ClearFields();
            return 0;
        case WM_KEYDOWN:
            if (wParam == VK_RETURN) RunCalculation();
            if (wParam == VK_ESCAPE) ClearFields();
            return 0;
        case WM_CTLCOLOREDIT: SetTextColor(reinterpret_cast<HDC>(wParam), RGB(240, 246, 237)); SetBkColor(reinterpret_cast<HDC>(wParam), RGB(36, 54, 46)); return reinterpret_cast<LRESULT>(fieldBrush);
        case WM_CTLCOLORSTATIC: {
            HDC dc = reinterpret_cast<HDC>(wParam); SetBkColor(dc, RGB(25, 40, 34));
            SetTextColor(dc, reinterpret_cast<HWND>(lParam) == resultText ? RGB(201, 243, 77) : RGB(190, 204, 195)); return reinterpret_cast<LRESULT>(panelBrush);
        }
        case WM_ERASEBKGND: { RECT r; GetClientRect(window, &r); FillRect(reinterpret_cast<HDC>(wParam), &r, panelBrush); return 1; }
        case WM_DESTROY: DeleteObject(panelBrush); DeleteObject(fieldBrush); PostQuitMessage(0); return 0;
    }
    return DefWindowProc(window, message, wParam, lParam);
}
}

int WINAPI wWinMain(HINSTANCE instance, HINSTANCE, PWSTR, int show) {
    const wchar_t klass[] = L"AcalcWindow";
    WNDCLASS wc{}; wc.hInstance = instance; wc.lpszClassName = klass; wc.lpfnWndProc = WindowProc; wc.hCursor = LoadCursor(nullptr, IDC_ARROW);
    RegisterClass(&wc);
    HWND window = CreateWindowEx(0, klass, L"acalc — Smart Calculator", WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU | WS_MINIMIZEBOX,
        CW_USEDEFAULT, CW_USEDEFAULT, 660, 510, nullptr, nullptr, instance, nullptr);
    ShowWindow(window, show); UpdateWindow(window);
    MSG message; while (GetMessage(&message, nullptr, 0, 0)) { TranslateMessage(&message); DispatchMessage(&message); }
    return 0;
}
