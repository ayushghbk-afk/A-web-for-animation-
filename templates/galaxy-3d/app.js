// --- Galaxy Configuration ---
const parameters = {
    count: 100000,          // Total number of stars
    size: 0.015,            // Particle size
    radius: 5,              // Maximum galaxy radius
    branches: 3,            // Number of spiral arms
    spin: 1,                // Twist effect along the arms
    randomness: 0.5,        // Random spread of particles
    power: 4,               // Concentration towards the arm centers
    insideColor: '#ffe3a0',  // Core color (warm/bright)
    outsideColor: '#1932ff', // Edge color (cool blue)
    rotationSpeed: 0.05     // Speed of the galaxy rotation
};

// --- Core Three.js Setup ---
const container = document.getElementById('canvas-container');
const loadingEl = document.getElementById('loading');

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2('#000000', 0.05);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 4, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// --- Galaxy Generator Function ---
let geometry = null;
let material = null;
let points = null;

function generateGalaxy() {
    // Clean up existing galaxy data to prevent memory leaks
    if(points !== null) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
    }

    geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for(let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

        positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color blending from inside to outside core
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3    ] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);
    
    if (loadingEl) loadingEl.style.opacity = 0;
}

generateGalaxy();

// --- Setup GUI Controller Panel ---
const gui = new lil.GUI({ title: 'Galaxy Controls' });

// Setup folders to keep the UI organized
const starsFolder = gui.addFolder('Stars Layout');
starsFolder.add(parameters, 'count').min(1000).max(300000).step(1000).name('Star Count').onFinishChange(generateGalaxy);
starsFolder.add(parameters, 'size').min(0.001).max(0.1).step(0.001).name('Star Size').onChange(generateGalaxy);

const shapeFolder = gui.addFolder('Galaxy Structure');
shapeFolder.add(parameters, 'radius').min(1).max(20).step(0.1).name('Radius').onChange(generateGalaxy);
shapeFolder.add(parameters, 'branches').min(1).max(12).step(1).name('Arms/Branches').onChange(generateGalaxy);
shapeFolder.add(parameters, 'spin').min(-5).max(5).step(0.01).name('Arm Twist (Spin)').onChange(generateGalaxy);
shapeFolder.add(parameters, 'randomness').min(0).max(2).step(0.01).name('Scatter Distribution').onChange(generateGalaxy);
shapeFolder.add(parameters, 'power').min(1).max(10).step(0.1).name('Core Density').onChange(generateGalaxy);

const appearanceFolder = gui.addFolder('Colors & Motion');
appearanceFolder.addColor(parameters, 'insideColor').name('Core Color').onChange(generateGalaxy);
appearanceFolder.addColor(parameters, 'outsideColor').name('Outer Color').onChange(generateGalaxy);
appearanceFolder.add(parameters, 'rotationSpeed').min(0).max(0.5).step(0.01).name('Rotation Speed');

// Open the folders by default
starsFolder.open();
shapeFolder.open();
appearanceFolder.open();


// --- Window Resize Handler ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// --- Animation Loop ---
const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Constant rotation driven by the controller panel variable
    if(points) {
        points.rotation.y = elapsedTime * parameters.rotationSpeed;
    }

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();
