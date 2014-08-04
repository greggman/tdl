TDL Docs
========
I hope the code is pretty straight forward. There's some simple examples here

<a href="http://greggman.github.com/tdl/example/example.html">http://greggman.github.com/tdl/example/example.html</a>

<a href="http://greggman.github.com/tdl/example/example2.html">http://greggman.github.com/tdl/example/example2.html</a>

<a href="http://greggman.github.com/tdl/example/picking.html">http://greggman.github.com/tdl/example/picking.html</a>

More complex samples can be found at <a href="http://webglsamples.googlecode.com">http://webglsamples.googlecode.com</a>

Briefly...

Your startup code should look like this

    canvas = document.getElementById("canvas");
    gl = tdl.webgl.setupWebGL(canvas);
    if (!gl) {
      return;  // Do nothing
    }

Where "canvas" is the id of the canvas you want to draw into. 
tdl.webgl.setupWebGL will replace the contents of the containing div 
with a link to getting a WebGL capable browser if the user's browser 
does not support WebGL. 

Otherwise...

Loading Shaders
---------------

    var program = tdl.programs.loadProgram(vertexShaderSource, fragmentShaderSource);

Compiles your shaders and creates a Program object.

Loading Textures
----------------

    var textures = {
      name1: tdl.textures.loadTexture(url),
      name2: tdl.textures.loadTexture(url)
    };

Loads your textures. The property names must match whatever you called the samplers 
in your shaders. loadTexture can take `[url]` for an image, `[r,g,b,a]` for solid 
texture. `[url,url,url,url,url,url]` for a cubemap and also `[url]` for a cubemap 
where all 6 faces are in a cross. It can also take an img or canvas tag.

Create Vertices or a Mesh
-------------------------

    var arrays = tdl.primitives.createSphere(1, 10, 10);

Creates vertices

The tdl.primitives functions return an object like this 

    {
        position: AttribBuffer,
        normal: AttribBuffer,
        texCoord: AttribBuffer
    };

The property names must match the attributes in your vertex shader if you want to 
add more.
 
A call to tdl.primitives.addTangentsAndBinormals adds the fields "tangent" and 
"binormal"

Create a Model
--------------

Once you have a program, a texture object and an arrays object you make a new 
model with

    var model = new tdl.models.Model(program, array, textures);


Rendering
---------

To draw the model there are 2 functions, `model.drawPrep(uniformMap)` and 
`model.draw(uniformMap)`.

Both of them take an object with uniformName/value pairs.

model.drawPrep binds the program, binds all the textures and attributes and 
sets whatever uniforms you pass in.

model.draw sets any more uniforms you pass in and then calls gl.drawElements.  
The idea is you call `model.drawPrep` once and then `model.draw` to draw a 
bunch of the same model, changing as few uniforms as possible. This is the 
fastest way to use WebGL.

Your rendering loop should look something like this

    function render() {
      var time = tdl.webgl.animationTime();
      model.drawPrep({...});
      model.draw({...});
      tdl.webgl.requestAnimationFrame(render, canvas);
    }
    render();  // call the first render manually to start it off.  


Math
----

The math is a little funky. There are 2 math libraries, math.js and fast.js.  
math.js comes from O3D and uses `JavaScript` arrays. A Matrix in that 
library is a an array of numbers.  fast.js uses `Float32Array` for its storage 
and most functions take a destination object as the first argument. 
Theoretically this is faster because you can avoid a certain number of 
allocations. It also means the numbers in the array do not have to be queried 
and converted from `JavaScript` Number to floats before calling glUniform.
