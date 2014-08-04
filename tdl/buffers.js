/*
 * Copyright 2009, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains objects to deal with WebGL
 *               buffers.
 */
define(['./base-rs'], function(BaseRS) {

tdl.provide('tdl.buffers');
/**
 * A module for buffers.
 * @namespace
 */
tdl.buffers = tdl.buffers || {};

/**
 * A Buffer represnets a WebGL buffer.
 * @constructor
 * @param {tdl.primitives.AttribBuffer} array AttribBuffer with
 *        data.
 * @param {number?} opt_target Assumes gl.ARRAY_BUFFER
 */
tdl.buffers.Buffer = function(array, opt_target) {
  var target = opt_target || gl.ARRAY_BUFFER;
  var buf = gl.createBuffer();
  this.target = target;
  this.buf = buf;
  this.set(array);
};

/**
 * Sets the contents of this buffer from the contents of the
 * given AttribBuffer.
 * @param {tdl.primitives.AttribBuffer} array AttribBuffer with
 *        data.
 * @param {number?} opt_usage GL buffer usage. Defaults to
 *        gl.STATIC_DRAW.
 */
tdl.buffers.Buffer.prototype.set = function(array, opt_usage) {
  this.numComponents_ = array.numComponents;
  this.numElements_ = array.numElements;
  this.totalComponents_ = this.numComponents_ * this.numElements_;
  if (array.buffer instanceof Float32Array) {
    this.type_ = gl.FLOAT;
    this.normalize_ = false;
  } else if (array.buffer instanceof Uint8Array) {
    this.type_ = gl.UNSIGNED_BYTE;
    this.normalize_ = true;
  } else if (array.buffer instanceof Int8Array) {
    this.type_ = gl.BYTE;
    this.normalize_ = true;
  } else if (array.buffer instanceof Uint16Array) {
    this.type_ = gl.UNSIGNED_SHORT;
    this.normalize_ = true;
  } else if (array.buffer instanceof Int16Array) {
    this.type_ = gl.SHORT;
    this.normalize_ = true;
  } else {
    throw("unhandled type:" + (typeof array.buffer));
  }
  gl.bindBuffer(this.target, this.buf);
  gl.bufferData(this.target, array.buffer, opt_usage || gl.STATIC_DRAW);
}

/**
 * Sets part of a buffer.
 * @param {ArrayBufferView} array some typed array buffer view
 * @param {number} the offset in bytes into the buffer to copy
 *        the array.
 */
tdl.buffers.Buffer.prototype.setRange = function(array, offset) {
  gl.bindBuffer(this.target, this.buf);
  gl.bufferSubData(this.target, offset, array);
};

/**
 * Gets the type of the buffer. Eg. `gl.FLOAT`
 * @return {number}
 */
tdl.buffers.Buffer.prototype.type = function() {
  return this.type_;
};

/**
 * Gets the number of components per element of buffer.
 * @return {number} num components per element in buffer
 */
tdl.buffers.Buffer.prototype.numComponents = function() {
  return this.numComponents_;
};

/**
 * Gets the number of elements in the buffer
 * @return {number} num elements in buffer
 */
tdl.buffers.Buffer.prototype.numElements = function() {
  return this.numElements_;
};

/**
 * Gets the total components in the buffer.
 * @return {number} Basically this is numComponents *
 *         numElements
 */
tdl.buffers.Buffer.prototype.totalComponents = function() {
  return this.totalComponents_;
};

/**
 * Get the WebGLBuffer for this buffer.
 * @return {WebGLBuffer} the WebGLBuffer for this buffer.
 */
tdl.buffers.Buffer.prototype.buffer = function() {
  return this.buf;
};

/**
 * Get the stride?
 * @return {number} stride.
 */
tdl.buffers.Buffer.prototype.stride = function() {
  return 0;
};

/**
 * Gets whether the data in this buffer should be normalized.
 * @return {boolean} normalizaiton.
 */
tdl.buffers.Buffer.prototype.normalize = function() {
  return this.normalize_;
}

/**
 * Get the offset?
 * @return {number} offset.
 */
tdl.buffers.Buffer.prototype.offset = function() {
  return 0;
};

return tdl.buffers;
});
