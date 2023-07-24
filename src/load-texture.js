import { gl } from "./webgl-context.js";

export default function loadTexture(url, minType = gl.NEAREST, magType = gl.NEAREST) {
    return new Promise(resolve => {
        const image = new Image();
        image.onload = () => {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minType);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magType);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            resolve(texture);
        };
        image.src = url;
    });
}
