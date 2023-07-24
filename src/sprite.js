import { mat4 } from "gl-matrix";
import { gl } from "./webgl-context.js";

export default class Sprite {
    constructor(program, spriteNames, spriteInfo, texture) {
        this.program = program;
        this.spriteNames = spriteNames;
        this.vertPosBuffer = spriteInfo.vertPosBuffer;
        this.texCoordBuffer = spriteInfo.texCoordBuffer;
        this.texture = texture;
        this.drawingIndex = 0;
        this.spriteSizes = spriteInfo.spriteSizes;
        this.x = 0;
        this.y = 0;
        this.w = this.spriteSizes[0].w;
        this.h = this.spriteSizes[0].h;
        this.modelMatrix = mat4.create();
        this.mvpMatrix = mat4.create();

        gl.useProgram(program);
        this.aPositionLocation = gl.getAttribLocation(program, "aPosition");
        this.aTexCoordLocation = gl.getAttribLocation(program, "aTexCoord");
        this.uMvpMatrixLocation = gl.getUniformLocation(program, "uMvpMatrix");
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setSize(w, h) {
        this.w = w;
        this.h = h;
    }

    setTextureRect(spriteName) {
        const index = this.spriteNames.indexOf(spriteName);
        this.w = this.spriteSizes[index].w;
        this.h = this.spriteSizes[index].h;
        this.drawingIndex = index * 4;
    }

    bind() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertPosBuffer);
        gl.vertexAttribPointer(this.aPositionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.aPositionLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(this.aTexCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.aTexCoordLocation);

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }

    draw(projViewMatrix) {
        gl.useProgram(this.program);
        this.bind();
        mat4.fromTranslation(this.modelMatrix, [this.x, this.y, 0]);
        mat4.scale(this.modelMatrix, this.modelMatrix, [this.w, this.h, 1]);
        mat4.mul(this.mvpMatrix, projViewMatrix, this.modelMatrix);
        gl.useProgram(this.program);
        gl.uniformMatrix4fv(this.uMvpMatrixLocation, false, this.mvpMatrix);
        gl.drawArrays(gl.TRIANGLE_STRIP, this.drawingIndex, 4);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
}
