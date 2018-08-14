#!/bin/sh
# Copyright 2017 The Chromium OS Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

# Checks for a model specific configuration and if present, starts bluetoothd
# with that config file; otherwise, starts with default config file.

config_file_param=""
model_dir="/etc/bluetooth/models"
if [ -d $model_dir ]; then
  model=$(mosys platform model)
  model_conf_file="${model_dir}/${model}.conf"
  if [ -e $model_conf_file ]; then
    config_file_param="--configfile=${model_conf_file}"
  fi
fi
exec /sbin/minijail0 -u bluetooth -g bluetooth -G \
  -c 3500 -n -- \
  /usr/libexec/bluetooth/bluetoothd ${BLUETOOTH_DAEMON_OPTION} --nodetach \
  ${config_file_param}
