import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../lib/store';

// Helper to manage keyboard state
function useKeyboard() {
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
}

export function FlightController() {
  const { camera } = useThree();
  const keys = useKeyboard();
  const { cameraMode, setCameraMode, setInCockpit } = useStore();

  const shipPosition = useRef(new THREE.Vector3(0, 0, 150));
  const shipRotation = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const shipQuaternion = useRef(new THREE.Quaternion());
  const velocity = useRef(new THREE.Vector3());

  // Setup initial camera pos
  useEffect(() => {
    camera.position.copy(shipPosition.current);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'v') {
        setCameraMode('third-person');
        setInCockpit(false);
      } else if (e.key.toLowerCase() === 'c') { // Using c for cockpit toggle since b was for cinematic in PRD
        setCameraMode('cockpit');
        setInCockpit(true);
      } else if (e.key.toLowerCase() === 'b') {
        setCameraMode('cinematic');
        setInCockpit(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [camera, setCameraMode, setInCockpit]);

  useFrame((state, delta) => {
    // Basic Movement Logic
    const speed = keys.current['shift'] ? 100 : 30; // Boost
    const rotSpeed = 1.5;

    // Pitch/Yaw controls (A/D = Yaw, W/S for forward/backward)
    if (keys.current['w']) velocity.current.z = -speed * delta;
    else if (keys.current['s']) velocity.current.z = speed * delta;
    else velocity.current.z = 0;

    if (keys.current['a']) shipRotation.current.y += rotSpeed * delta;
    if (keys.current['d']) shipRotation.current.y -= rotSpeed * delta;

    // Optional: Vertical thrust
    if (keys.current[' ']) velocity.current.y = speed * delta;
    else if (keys.current['c']) velocity.current.y = -speed * delta;
    else velocity.current.y = 0;

    shipQuaternion.current.setFromEuler(shipRotation.current);

    // Apply local velocity to global position
    const localMovement = velocity.current.clone().applyQuaternion(shipQuaternion.current);
    shipPosition.current.add(localMovement);

    // Update camera based on mode
    if (cameraMode === 'cockpit') {
      camera.position.copy(shipPosition.current);
      camera.quaternion.copy(shipQuaternion.current);
    } else if (cameraMode === 'third-person') {
      // Offset behind the ship
      const offset = new THREE.Vector3(0, 5, 20).applyQuaternion(shipQuaternion.current);
      camera.position.copy(shipPosition.current).add(offset);
      camera.quaternion.copy(shipQuaternion.current);
      // Slightly look down
      camera.rotateX(-0.1);
    } else if (cameraMode === 'cinematic') {
      // Very basic cinematic: slow orbit around current pos
      const time = state.clock.getElapsedTime();
      const orbitOffset = new THREE.Vector3(
        Math.cos(time * 0.2) * 50,
        10,
        Math.sin(time * 0.2) * 50
      );
      camera.position.copy(shipPosition.current).add(orbitOffset);
      camera.lookAt(shipPosition.current);
    }
  });

  return null; // Logic only
}
