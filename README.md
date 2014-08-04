TDL
===

TDL is a **low-level** library for WebGL apps. It currently focuses on speed of rendering rather than ease of use.

Some [terse docs can be found at here](docs.md)

Note: By **low-level** I mean TDL doesn't currently provide any 3D knowledge. 
There are almost no built in shaders. There is no scene graph. There are just some objects for wrapping WebGL
shaders and helping to easily associate vertex data with attributes and update uniforms. 

Example: Assuming a shaders like this.

    <script id="vshader" type="not-js">
    attribute vec4 position;
    attribute vec2 texcoord;
    
    uniform mat4 u_worldMatrix;
    uniform mat4 u_projectionMatrix;
    
    varying vec2 v_texcoord;
    
    void main() {
      gl_Position = u_projectionMatrix * u_worldMatrix * position;
      v_texcoord = texcoord;
    }
    </script>
    
    <script id="fshader" type="not-js">
    varying vec2 v_texcoord;
    uniform sampler2D u_texture;
    
    void main() {
      gl_FragColor = texture2D(u_texture, v_texcoord);
    }
    </script>

In WebGL you'd do this

    // At init time:
    var program = UtilToCompileShaders("vshader", "fshader");
    var positionLoc = gl.getAttribLocation(program, "position");
    var texcoordLoc = gl.getAttribLocation(program, "texcoord");
    var worldMatLoc = gl.getUniformLocation(program, "u_worldMatrix");
    var projectionMatLoc = gl.getUniformLocation(program, "u_projectionMatrix");
    var textureLoc = gl.getUniformLocation(program, "u_texture");

    var positions = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positions);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData), gl.STATIC_DRAW);
    
    var tecoords = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoords);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoordData), gl.STATIC_DRAW);
    
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, someImage);


    // At draw time
    gl.bindBuffer(gl.ARRAY_BUFFER, positions);
    gl.enableVertexAttribArray(programLoc);
    gl.vertexAttribPointer(programLoc, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positions);
    gl.enableVertexAttribArray(texcoordLoc);
    gl.vertexAttribPointer(tecoordLoc, 2, gl.FLOAT, false, 0, 0);
    
    gl.useProgram(program);
    gl.uniformMatrix4f(projectionMatLoc, false, projectionMatrix);
    
    for (var i = 0; i < 3; ++i)
    {
        gl.uniformMatrix4f(worldMatLoc, false, computeWorldMatrix(i));
        gl.drawArrays(gl.TRIANGLES, 0, num);
    }
    
In TDL that would be shortened to

    // At init time.
    var program = tdl.programs.loadProgramFromScriptTags("vshader", "fshader");
    var arrays = {
      position: new tdl.primitives.AttribBuffer(3, positionData),
      texcoord: new tdl.primitives.AttribBuffer(2, texcoordData),
    };
    var textures = {
      u_texture: new tdl.textures.loadTexture(someImage),
    }
    var model = new tdl.models.Model(program, arrays, textures);
  
    
    // At Draw time
    var sharedUniforms = {
      u_projectionMatrix: projectionMatrix,
    };
    var perObjectUniforms = {
      u_worldMatrix: worldMatrix,
    };
    
    model.drawPrep(sharedUniforms);
    
    for (var i = 0; i < 3; ++i)
    {
        perObjectUnifirms.u_worldMatrix = computeWorldMatrix(i);
        model.draw(perObjectuniforms);
    }

