import { gl } from "./webgl-context.js";

export default function getSpriteInfo(atlasJson, spriteNames) {

    const atlasW = atlasJson.meta.size.w;
    const atlasH = atlasJson.meta.size.h;

    const vertPositions = [];
    const texCoords = [];
    const spriteSizes = [];

    for (let i = 0; i < spriteNames.length; i++) {
        vertPositions.push(
            -0.5, 0.5,
            -0.5, -0.5,
            0.5, 0.5,
            0.5, -0.5);

        const tx = parseInt(atlasJson.frames[spriteNames[i]]["frame"]["x"]) / atlasW;
        const ty = parseInt(atlasJson.frames[spriteNames[i]]["frame"]["y"]) / atlasH;
        const tw = parseInt(atlasJson.frames[spriteNames[i]]["frame"]["w"]) / atlasW;
        const th = parseInt(atlasJson.frames[spriteNames[i]]["frame"]["h"]) / atlasH;
        texCoords.push(
            tx, ty,
            tx, ty + th,
            tx + tw, ty,
            tx + tw, ty + th);

        const spriteW = parseInt(atlasJson.frames[spriteNames[i]]["frame"]["w"]);
        const spriteH = parseInt(atlasJson.frames[spriteNames[i]]["frame"]["h"]);
        spriteSizes.push({ w: spriteW, h: spriteH });
    }

    const vertPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertPositions), gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

    const result = {
        vertPosBuffer: vertPosBuffer,
        texCoordBuffer: texCoordBuffer,
        spriteSizes: spriteSizes
    };
    return result;
}
