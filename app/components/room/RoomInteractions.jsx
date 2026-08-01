import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ROOM } from './roomConfig';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function PlayerControls({ onReady }) {
  const { camera, gl } = useThree();
  const input = useRef(new Set());
  const view = useRef({
    yaw: 0,
    pitch: 0,
    velocity: new THREE.Vector3(),
    scrollTarget: ROOM.entranceZ - 1.15,
  });
  const hasEntered = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;
    const onKeyDown = (event) => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault();
        input.current.add(event.code);
      }
    };
    const onKeyUp = (event) => input.current.delete(event.code);
    const onMouseMove = (event) => {
      if (document.pointerLockElement !== canvas || !hasEntered.current) return;
      view.current.yaw = clamp(view.current.yaw - event.movementX * 0.0024, -1.22, 1.22);
      view.current.pitch = clamp(view.current.pitch - event.movementY * 0.0019, -0.26, 0.26);
    };
    const requestControl = () => {
      if (hasEntered.current && document.pointerLockElement !== canvas) canvas.requestPointerLock?.();
    };
    const onWheel = (event) => {
      if (!hasEntered.current) return;
      event.preventDefault();
      view.current.scrollTarget = clamp(
        view.current.scrollTarget - event.deltaY * .0022,
        ROOM.backWallZ + 1.25,
        ROOM.entranceZ - .45,
      );
    };
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', requestControl);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', requestControl);
      canvas.removeEventListener('wheel', onWheel);
      if (document.pointerLockElement === canvas) document.exitPointerLock?.();
    };
  }, [gl]);

  useFrame((state, delta) => {
    const entrance = clamp(state.clock.elapsedTime / 1.15, 0, 1);
    const easedEntrance = entrance * entrance * (3 - 2 * entrance);
    const controls = view.current;
    camera.rotation.order = 'YXZ';
    camera.rotation.y = controls.yaw;
    camera.rotation.x = controls.pitch;

    if (entrance < 1) {
      camera.position.set(0, ROOM.cameraHeight, THREE.MathUtils.lerp(ROOM.entranceZ + 1.4, ROOM.entranceZ - 1.15, easedEntrance));
      return;
    }

    if (!hasEntered.current) {
      hasEntered.current = true;
      onReady?.();
    }

    const forward = (input.current.has('KeyW') || input.current.has('ArrowUp') ? 1 : 0) - (input.current.has('KeyS') || input.current.has('ArrowDown') ? 1 : 0);
    const sideways = (input.current.has('KeyD') || input.current.has('ArrowRight') ? 1 : 0) - (input.current.has('KeyA') || input.current.has('ArrowLeft') ? 1 : 0);
    const desired = new THREE.Vector3(
      Math.sin(controls.yaw) * forward + Math.cos(controls.yaw) * sideways,
      0,
      -Math.cos(controls.yaw) * forward + Math.sin(controls.yaw) * sideways,
    );
    if (desired.lengthSq() > 0) desired.normalize().multiplyScalar(3.4);
    controls.velocity.lerp(desired, 1 - Math.exp(-10 * delta));

    controls.scrollTarget = clamp(
      controls.scrollTarget + controls.velocity.z * delta,
      ROOM.backWallZ + 1.25,
      ROOM.entranceZ - .45,
    );
    const nextX = clamp(camera.position.x + controls.velocity.x * delta, -3.5, 3.5);
    const nextZ = THREE.MathUtils.damp(camera.position.z, controls.scrollTarget, 5.2, delta);
    camera.position.set(nextX, ROOM.cameraHeight, nextZ);
  });

  return null;
}
