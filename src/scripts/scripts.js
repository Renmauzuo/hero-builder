var exporter, scene, link, character, weapon, weaponBone, loader;

const weapons = {
    longsword: {
        model: 'Longsword'
    },
    mace: {
        model: 'Mace'
    },
    maul: {
        model: 'Maul'
    }
}

$(function () {
    link = document.createElement( 'a' );
    link.style.display = 'none';
    document.body.appendChild( link );
    link.download = 'scene.stl';

    loader = new THREE.GLTFLoader();
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

    let model = 'Female-Rigged-2';
    //let model = 'Female-Body-Rigged-NEW';
    //let model = 'Dwarf-Female-Druid-2';
    loader.load( 'models/characters/'+model+'.glb', function ( gltf ) {
        gltf.scene.traverse( child => {

            if ( child.material ) child.material.metalness = 0;
        
        } );
        character = gltf.scene.children[0];
        weaponBone = character.children[0];
        scene.add( gltf.scene );

    
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );

    $('#weapon-select').on('change', updateCharacterWeapon);

});

function downloadSTL() {
    console.log('download');
    let result = exporter.parse( scene, { binary: true } );
    let blob = new Blob( [ result ], { type: 'application/octet-stream' } );
    link.href = URL.createObjectURL( blob );
    link.click();
}

function updateCharacterWeapon () {
    //Remove old weapon
    weaponBone.remove(weapon);
    let target = $('#weapon-select').val();
    if (target.length) {

        let model = weapons[target].model;
        loader.load( 'models/weapons/'+model+'.glb', function ( gltf ) {
            gltf.scene.traverse( child => {
    
                if ( child.material ) child.material.metalness = 0;
            
            } );
            weapon = gltf.scene.children[0];
            weapon.rotation.set(3.14159, 0, 0);
            weapon.position.set(.1,.1,-0.1);
            let weaponScale = .1;
            weapon.scale.set(weaponScale, weaponScale, weaponScale);
            weaponBone.add( weapon );
        }, undefined, function ( error ) {
        
            console.error( error );
        
        } );
    }
}