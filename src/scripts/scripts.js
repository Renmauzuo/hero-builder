

$(function () {
    const loader = new THREE.GLTFLoader();

    let animationWidth = $('#viewport').width();
    let animationHeight = $('#viewport').height();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x808080 );
    const camera = new THREE.PerspectiveCamera( 75, animationWidth / animationHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( animationWidth, animationHeight );
    $('#viewport').append(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //const cube = new THREE.Mesh( geometry, material );
    //scene.add( cube );

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    const controls = new THREE.OrbitControls( camera, renderer.domElement );

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set( 0, 30, 100 );
    controls.update();
    
    //camera.position.y = 2;
    //camera.position.z = 5;


    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();

    loader.load( 'models/characters/Dwarf-Female-Druid-2.glb', function ( gltf ) {
        scene.add( gltf.scene );
    
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );
});


