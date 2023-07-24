import { gl } from "./webgl-context.js";

export default async function createProgram(path, vertShaderFileName,
    fragShaderFileName) //
{
    let response = await fetch(path + vertShaderFileName);
    const vertShaderSource = await response.text();
    response = await fetch(path + fragShaderFileName);
    const fragShaderSource = await response.text();

    const vShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vShader, vertShaderSource);
    gl.compileShader(vShader);
    let ok = gl.getShaderParameter(vShader, gl.COMPILE_STATUS);
    if (!ok) {
        console.log(`${vertShaderFileName}: ${gl.getShaderInfoLog(vShader)}`);
        return null;
    };

    const fShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fShader, fragShaderSource);
    gl.compileShader(fShader);
    ok = gl.getShaderParameter(fShader, gl.COMPILE_STATUS);
    if (!ok) {
        console.log(`${fragShaderFileName}: ${gl.getShaderInfoLog(fShader)}`);
        return null;
    };

    const program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    ok = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!ok) {
        console.log(`Link error with shaders ${vertShaderFileName}` +
            ` and ${fragShaderFileName}`);
        console.log(gl.getProgramInfoLog(program));
        return null;
    };
    gl.useProgram(program);

    return program;
}
