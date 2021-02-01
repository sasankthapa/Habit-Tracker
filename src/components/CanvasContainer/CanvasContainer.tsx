import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {Group, PerspectiveCamera, Scene, WebGLRenderer} from 'three';

const CanvasContainer:React.FC<{}> = () =>{
    const canvas=useRef<HTMLCanvasElement>(null)
    let sphereGrp:Group;
    const distance=400;

    function createSpheres(scene:Scene){
        sphereGrp=new THREE.Group();
        for(var i=0; i < 1000; i++ ) {
            var sphere=new THREE.SphereGeometry(4, Math.random() * 12 , Math.random() *12);
            var material = new THREE.MeshPhongMaterial({
                color:Math.random() * 0xff0000 - 0xff0000,
                flatShading:true
            })
            
            var sphereMesh = new THREE.Mesh(sphere,material);
            sphereMesh.position.x= Math.random()*distance*10;
            sphereMesh.position.y= Math.random()*-distance*6;
            sphereMesh.position.z= Math.random()*distance*4;
            sphereMesh.rotation.y= Math.random()*2*Math.PI;
            
            sphereMesh.scale.x=sphereMesh.scale.y=sphereMesh.scale.z=Math.random()*12+5;

            sphereGrp.add(sphereMesh); 
        }
        scene.add(sphereGrp)
    }

    function createSpace(scene:Scene){
        const dotsGroup=new THREE.Group();
        for(var i=0; i < 420; i++ ){
            var circleGeometry=new THREE.SphereGeometry(2, Math.random()*5,Math.random()*5);
            var material=new THREE.MeshBasicMaterial({
                color:Math.random() * 0xff0000 - 0xff0000,
                flatShading:true
            })

            var circleMesh=new THREE.Mesh(circleGeometry,material);
            material.side=THREE.DoubleSide;

            circleMesh.position.x= Math.random()*-distance*60;
            circleMesh.position.y= Math.random()*-distance*6;
            circleMesh.position.z= Math.random()*distance*3;
            circleMesh.rotation.y= Math.random()*2*Math.PI;
            
            circleMesh.scale.x=circleMesh.scale.y=circleMesh.scale.z=Math.random()*6+5;

            dotsGroup.add(circleMesh)
        }

        dotsGroup.position.x=7000;
        dotsGroup.position.y=900;
        dotsGroup.position.z= -2000;
        dotsGroup.rotation.y = Math.PI*600;
        dotsGroup.rotation.z= Math.PI*500;

        scene.add(dotsGroup)
    }

    function onWindowResize(camera:PerspectiveCamera,renderer:WebGLRenderer){
        camera.aspect=window.innerWidth/window.innerHeight;
        renderer.setSize(window.innerWidth,window.innerHeight)
        camera.updateProjectionMatrix();
    }

    function onMouseMove(event:MouseEvent,camera:PerspectiveCamera,scene:Scene){
        let mouseX=event.clientX-window.innerWidth/2;
        let mouseY=event.clientY-window.innerHeight/2;
        camera.position.x+=(mouseX - camera.position.x)*0.005;
        camera.position.y+=(mouseY - camera.position.y)*0.005;
        camera.lookAt(scene.position);
    }

    function animate(camera:PerspectiveCamera,scene:Scene,renderer:WebGLRenderer){
        requestAnimationFrame(()=>animate(camera,scene,renderer));
        render(camera,scene,renderer);
    }

    function render(camera:PerspectiveCamera,scene:Scene,renderer:WebGLRenderer){
        for(var i =0; i < sphereGrp.children.length ; i++){
            var object=sphereGrp.children[i];
            object.rotation.y+=Math.PI/5;
            if(i < 30){
                object.position.x-=10;
            }
        }
        renderer.render(scene, camera)    
    }

    useEffect(()=>{     
        if(canvas.current){
            const renderer=new THREE.WebGLRenderer({canvas:canvas.current,antialias:true});
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x140b33,1)
            
            const scene=new THREE.Scene();
            const camera=new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,0.2,25000);
            camera.position.set(100, -400, 2000)
            scene.add(camera)

            var light=new THREE.PointLight(0xffffff,1,4000);
            light.position.set(50,0,0);
            var light_two=new THREE.PointLight(0xffffff,1,4000);
            light_two.position.set(-100,800,800);
            var lightAmbient=new THREE.AmbientLight(0x404040);
            scene.add(light,light_two,lightAmbient);

            createSpheres(scene);
            createSpace(scene);

            renderer.render(scene,camera);
            window.addEventListener('resize', ()=>onWindowResize(camera,renderer) , false)
            document.addEventListener('mousemove', (e)=>onMouseMove(e,camera,scene), false)
            animate(camera,scene,renderer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return <canvas style={{position:'absolute',top:'0',left:'0',zIndex:-99999}}ref={canvas}>

    </canvas>}

export default CanvasContainer;
