var exporter, scene, link;

$(function () {
    link = document.createElement( 'a' );
    link.style.display = 'none';
    document.body.appendChild( link );
    link.download = 'scene.stl';

    const loader = new THREE.GLTFLoader();
    exporter = new THREE.STLExporter();

    let animationWidth = $('#viewport').width();
    let animationHeight = $('#viewport').height();
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x808080 );
    const camera = new THREE.PerspectiveCamera( 75, animationWidth / animationHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( animationWidth, animationHeight );
    $('#viewport').append(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //const cube = new THREE.Mesh( geometry, material );
    //scene.add( cube );


    var light = new THREE.AmbientLight( 0x404040 );
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

    let model = 'Female-Body-Rigged-NEW';
    //let model = 'Dwarf-Female-Druid-2';
    loader.load( 'models/characters/'+model+'.glb', function ( gltf ) {
        gltf.scene.traverse( child => {

            if ( child.material ) child.material.metalness = 0;
        
        } );
        scene.add( gltf.scene );

    
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );
});

function downloadSTL() {
    console.log('download');
    let result = exporter.parse( scene, { binary: true } );
    let blob = new Blob( [ result ], { type: 'application/octet-stream' } );
    link.href = URL.createObjectURL( blob );
    link.click();
}