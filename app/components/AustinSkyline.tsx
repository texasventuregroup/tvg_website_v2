'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AustinSkyline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            45,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 12);
        camera.lookAt(0, 1, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Colors - TVG Palette
        const colors = {
            green: 0x016F4E,
            teal: 0x01A072,
            forest: 0x082820,
            cream: 0xfcf7f0,
            accent: 0x368686,
        };

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        scene.add(directionalLight);

        const backLight = new THREE.DirectionalLight(colors.teal, 0.3);
        backLight.position.set(-5, 5, -5);
        scene.add(backLight);

        // === BUILDINGS GROUP ===
        const cityGroup = new THREE.Group();

        // Helper to create a building
        const createBuilding = (
            width: number,
            height: number,
            depth: number,
            x: number,
            z: number,
            color: number
        ) => {
            const geometry = new THREE.BoxGeometry(width, height, depth);
            const material = new THREE.MeshPhongMaterial({
                color,
                flatShading: true,
                shininess: 30
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, height / 2, z);
            return mesh;
        };

        // === TEXAS STATE CAPITOL (center, iconic dome) ===
        const capitolBase = createBuilding(1.8, 1.2, 1, 0, 0, colors.cream);
        cityGroup.add(capitolBase);

        // Capitol dome
        const domeGeometry = new THREE.SphereGeometry(0.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMaterial = new THREE.MeshPhongMaterial({ color: colors.cream, flatShading: true });
        const dome = new THREE.Mesh(domeGeometry, domeMaterial);
        dome.position.set(0, 1.2, 0);
        cityGroup.add(dome);

        // Capitol spire
        const spireGeometry = new THREE.ConeGeometry(0.08, 0.4, 8);
        const spireMaterial = new THREE.MeshPhongMaterial({ color: colors.teal });
        const spire = new THREE.Mesh(spireGeometry, spireMaterial);
        spire.position.set(0, 1.8, 0);
        cityGroup.add(spire);

        // === FROST BANK TOWER (left, owl-shaped) ===
        // Main tower
        const frostMain = createBuilding(0.8, 3.5, 0.8, -2.5, 0, colors.green);
        cityGroup.add(frostMain);

        // Owl "ears" (distinctive crown)
        const earGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.3);
        const earMaterial = new THREE.MeshPhongMaterial({ color: colors.teal, flatShading: true });
        const leftEar = new THREE.Mesh(earGeometry, earMaterial);
        leftEar.position.set(-2.7, 3.8, 0);
        cityGroup.add(leftEar);
        const rightEar = new THREE.Mesh(earGeometry, earMaterial);
        rightEar.position.set(-2.3, 3.8, 0);
        cityGroup.add(rightEar);

        // === TALL DOWNTOWN TOWERS (Google/Austonian style) ===
        // The Austonian (tallest residential)
        const austonian = createBuilding(0.6, 4.2, 0.6, 2.2, 0, colors.accent);
        cityGroup.add(austonian);

        // 360 Condos / Google tower
        const tower360 = createBuilding(0.7, 3.8, 0.7, 3.2, 0, colors.forest);
        cityGroup.add(tower360);

        // Additional downtown buildings
        const building1 = createBuilding(0.5, 2.5, 0.5, -1.2, 0, colors.green);
        cityGroup.add(building1);

        const building2 = createBuilding(0.6, 2.8, 0.6, 1.0, 0, colors.teal);
        cityGroup.add(building2);

        const building3 = createBuilding(0.4, 2.0, 0.4, -3.5, 0, colors.accent);
        cityGroup.add(building3);

        const building4 = createBuilding(0.5, 1.8, 0.5, 4.0, 0, colors.green);
        cityGroup.add(building4);

        // Smaller buildings in back
        const backBuilding1 = createBuilding(0.4, 1.5, 0.4, -0.8, -1, colors.forest);
        cityGroup.add(backBuilding1);

        const backBuilding2 = createBuilding(0.5, 1.8, 0.5, 1.5, -1, colors.green);
        cityGroup.add(backBuilding2);

        const backBuilding3 = createBuilding(0.3, 1.2, 0.3, 2.8, -0.8, colors.teal);
        cityGroup.add(backBuilding3);

        // === CONGRESS AVENUE BRIDGE ===
        const bridgeGeometry = new THREE.BoxGeometry(6, 0.15, 0.4);
        const bridgeMaterial = new THREE.MeshPhongMaterial({ color: colors.forest, flatShading: true });
        const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);
        bridge.position.set(0, 0.1, 2);
        cityGroup.add(bridge);

        // Bridge supports
        for (let i = -2; i <= 2; i += 1) {
            const supportGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.1);
            const support = new THREE.Mesh(supportGeometry, bridgeMaterial);
            support.position.set(i, 0, 2);
            cityGroup.add(support);
        }

        // === LADY BIRD LAKE ===
        const lakeGeometry = new THREE.PlaneGeometry(10, 3);
        const lakeMaterial = new THREE.MeshPhongMaterial({
            color: colors.teal,
            transparent: true,
            opacity: 0.6,
            flatShading: true,
            side: THREE.DoubleSide
        });
        const lake = new THREE.Mesh(lakeGeometry, lakeMaterial);
        lake.rotation.x = -Math.PI / 2;
        lake.position.set(0, -0.05, 3);
        cityGroup.add(lake);

        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(12, 8);
        const groundMaterial = new THREE.MeshPhongMaterial({
            color: colors.cream,
            flatShading: true,
            side: THREE.DoubleSide
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.set(0, -0.1, 0);
        cityGroup.add(ground);

        scene.add(cityGroup);
        cityGroup.position.y = -1;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = (event.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Subtle rotation based on mouse
            cityGroup.rotation.y = mouseX * 0.3;
            cityGroup.rotation.x = mouseY * 0.1;

            // Gentle ambient rotation
            cityGroup.rotation.y += 0.001;

            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0"
            style={{
                pointerEvents: 'none',
                opacity: 0.9
            }}
        />
    );
}
