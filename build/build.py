#!/usr/bin/python
# Copyright (c) 2011 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

import subprocess
import os
import os.path
import sys
import re
from optparse import OptionParser

VERBOSE = False
JS_FILES = [
  "../tdl/base.js",
  "../tdl/buffers.js",
  "../tdl/clock.js",
  "../tdl/fast.js",
  "../tdl/fps.js",
  "../tdl/framebuffers.js",
  "../tdl/fullscreen.js",
  "../tdl/io.js",
  "../tdl/loader.js",
  "../tdl/log.js",
  "../tdl/math.js",
  "../tdl/misc.js",
  "../tdl/models.js",
  "../tdl/particles.js",
  "../tdl/primitives.js",
  "../tdl/programs.js",
  "../tdl/quaternions.js",
  "../tdl/screenshot.js",
  "../tdl/shader.js",
  "../tdl/string.js",
  "../tdl/sync.js",
  "../tdl/textures.js",
  "../tdl/webgl.js",
]

def Execute(cmd, args, file=None):
  global VERBOSE
  if VERBOSE:
    print "%s %s" % (cmd, " ".join(args))
  return subprocess.Popen([cmd] + args, stdin=file, stdout=subprocess.PIPE).communicate()[0]


def main(argv):
  """This is the main function."""
  global VERBOSE
  parser = OptionParser()
  parser.add_option(
      "-v", "--verbose", action="store_true",
      help="prints more output.")

  (options, args) = parser.parse_args(args=argv)

  VERBOSE = options.verbose
  out_file = "tdl-min.js"

  files = ["--js=%s" % (name) for name in JS_FILES]
  #print files

  Execute("java",
          ["-jar", "compiler.jar",
           ("--js_output_file=%s" % (out_file, )),
          ] + files)


if __name__ == '__main__':
  sys.exit(main(sys.argv[1:]))
