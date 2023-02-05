import { useEffect, useRef } from "react";

export function useOnDraw(onDraw) {

    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);
    const prevPointRef = useRef(null);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    function setCanvasRef(ref) {
        canvasRef.current = ref;
    }

    function onCanvasMouseDown() {
        isDrawingRef.current = true;
    }

    useEffect(() => {
        function computePointInCanvas(clientX, clientY) {
            if (canvasRef.current) {
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    x: clientX - boundingRect.left,
                    y: clientY - boundingRect.top
                }
            } else {
                return null;
            }

        }
        function initMouseMoveListener() {
            const mouseMoveListener = (e) => {
                if (isDrawingRef.current && canvasRef.current) {
                    const point = computePointInCanvas(e.clientX, e.clientY);
                    const ctx = canvasRef.current.getContext('2d');
                    if (onDraw) onDraw(ctx, point, prevPointRef.current);
                    prevPointRef.current = point;
                    console.log(point);
                }
            }
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener("mousemove", mouseMoveListener);
        }

        function initMouseUpListener() {
            const listener = () => {
                isDrawingRef.current = false;
                prevPointRef.current = null;
            }
            mouseUpListenerRef.current = listener;
            window.addEventListener("mouseup", listener);
        }

        function cleanup() {
            if (mouseMoveListenerRef.current) {
                window.removeEventListener("mousemove", mouseMoveListenerRef.current);
            }
            if (mouseUpListenerRef.current) {
                window.removeEventListener("mouseup", mouseUpListenerRef.current);
            }
        }

        initMouseMoveListener();
        initMouseUpListener();
        return () => cleanup();

    }, [onDraw]);

    return {
        setCanvasRef,
        onCanvasMouseDown
    }

};

// import { useEffect, useRef } from "react";

// export function useOnDraw(onDraw) { 

//     const canvasRef = useRef(null);
//     const isDrawingRef = useRef(false);
//     const prevPointRef = useRef(null);

//     const mouseMoveListenerRef = useRef(null);
//     const mouseUpListenerRef = useRef(null);

//     function setCanvasRef(ref) {
//         console.log('in setCanvasRef');
//         canvasRef.current = ref;
//     }
//     function onCanvasMouseDown(){
//         console.log('in onCanvasMouseDown');
//         isDrawingRef.current = true;
//     }

//     useEffect(() =>{

//         function computePointInCanvas(clientX, clientY) {
//             if(canvasRef.current){
//                 console.log('test computePointInCanvas');
//             const boundingRect = canvasRef.current.getBoundingClientRect();
//             return{
//                 x: clientX - boundingRect.left ,
//                 y: clientY - boundingRect.top
//             }
//         } else {
//             return null;
//         }
//         }

//         function initmouseMoveListener(){
//             const mouseMoveListener = (e) => {
//                 if(isDrawingRef.current && canvasRef.current){
//                     console.log('test initmouseMoveListener');
//                     console.log({ x : e.clientX, y : e.clientY});
//                     const point = computePointInCanvas(e.clientX, e.clientY);
//                     const ctx = canvasRef.current.getContext('2d');
//                     if(onDraw) onDraw(ctx, point, prevPointRef.current);
//                     prevPointRef.current = point;
//                     console.log(point);
//                 }
//             }
//             mouseMoveListenerRef.current = mouseMoveListener;
//             window.addEventListener("mousemove", mouseMoveListener);
//         }
    
//         function initMouseUpListener() {
//             const listener = () => {
//                 console.log('in initMouseUpListener');
//                 isDrawingRef.current = false;
//                 prevPointRef.current = null;
//             }
//             mouseUpListenerRef.current = listener;
//             window.addEventListener("mouseup", listener)
//         }

//         function removeListeners() {
//             if(mouseMoveListenerRef.current){
//                 window.removeEventListener("mousemove", mouseMoveListenerRef.current)
//             }
//             if(mouseUpListenerRef.current){
//                 window.removeEventListener("mouseup", mouseUpListenerRef.current)
//             }
//         }
//         initmouseMoveListener();
//         initMouseUpListener();
//         return () => {
//             //TODO: clean up!!
//             removeListeners();
//         }
//     },[onDraw]);

//     return(
//         setCanvasRef,
//         onCanvasMouseDown
//     )

    /*
    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseDownListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    const prevPointRef = useRef(null);

    useEffect(() => {
        return () => {
            if(mouseMoveListenerRef.current){
                window.removeEventListener("mousemove", mouseMoveListenerRef.current)
            }
            if(mouseUpListenerRef.current){
                window.removeEventListener("mouseup", mouseUpListenerRef.current)
            }
        }
    }, []);

    function setCanvasRef(ref) {
        if(!ref) return;
        if(canvasRef.current){
            canvasRef.current.removeEventListener("mousedown", mouseDownListenerRef.current);
        }
        canvasRef.current = ref;
        initmouseMoveListener();
        initMouseDownListener();
        initMouseUpListener();
    }

    function initmouseMoveListener(){
        const mouseMoveListener = (e) => {
            if(isDrawingRef.current){
                // console.log({ x : e.clientX, y : e.clientY});
                const point = computePointInCanvas(e.clientX, e.clientY);
                const ctx = canvasRef.current.getContext('2d');
                if(onDraw) onDraw(ctx, point, prevPointRef.current);
                prevPointRef.current = point;
                console.log(point);
            }
        }
        mouseMoveListenerRef.current = mouseMoveListener;
        window.addEventListener("mousemove", mouseMoveListener);
    }

    function initMouseUpListener() {
        const listener = () => {
            isDrawingRef.current = false;
            prevPointRef.current = null;
        }
        mouseUpListenerRef.current = listener;
        window.addEventListener("mouseup", listener)
    }

    function initMouseDownListener(){
        if(!canvasRef.current) return;
        const listener = () => {
            isDrawingRef.current = true;

        }
        mouseDownListenerRef.current = listener;
        canvasRef.current.addEventListener("mousedown", listener);
    }

    function computePointInCanvas(clientX, clientY) {
        if(canvasRef.current){

        const boundingRect = canvasRef.current.getBoundingClientRect();
        return{
            x : clientX - boundingRect.left ,
            y : clientY - boundingRect.top
        }
    } else {
        return null;
    }
    }

    return setCanvasRef; */

// }