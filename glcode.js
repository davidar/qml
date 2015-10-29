Qt.include("three.js")

var camera, scene, renderer;

var SEPARATION = 100, AMOUNTX = 10, AMOUNTY = 10;

var camera, scene, renderer;

var particles, particle, count = 0;

var windowHalfX, windowHalfY;

function initializeGL(canvas) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 10000);
    camera.position.z = 1000;
    windowHalfX = canvas.width / 2;
    windowHalfY = canvas.height / 2;

    scene.add( new THREE.AmbientLight( 0xffffff ) );

    particles = [];
    var i = 0;
    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
            var ballGeo = new THREE.SphereGeometry( 1, 10, 10 );
            var ballMaterial = new THREE.MeshPhongMaterial( { color: 0x000000 } );

            var sphere = new THREE.Mesh( ballGeo, ballMaterial );

            var particle = particles[ i ++ ] = sphere;
            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
            scene.add( particle );
        }
    }

    renderer = new THREE.Canvas3DRenderer({
        canvas: canvas,
        antialias: true,
        devicePixelRatio: canvas.devicePixelRatio,
        alpha: true
    });
    renderer.setPixelRatio(canvas.devicePixelRatio);
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor(0xeeeeee);
}

function resizeGL(canvas) {
    windowHalfX = canvas.width / 2;
    windowHalfY = canvas.height / 2;

    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(canvas.devicePixelRatio);
    renderer.setSize(canvas.width, canvas.height);
}

function paintGL(canvas) {
    camera.position.x = 500 * Math.cos(count/21);
    camera.position.y = 500 * Math.sin(count/21);
    camera.lookAt( scene.position );

    var i = 0;

    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

            particle = particles[ i++ ];
            var h = Math.sin(0.3 * (ix + count)) + Math.sin(0.5 * (iy + count));
            particle.position.y = 50 * h;
            particle.scale.x = particle.scale.y = particle.scale.z = 5 * (h + 2);

        }

    }

    renderer.render(scene, camera);

    count += 0.1;
}

