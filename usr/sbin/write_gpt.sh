#!/bin/sh
# Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

# This script is automatically generated by /mnt/host/source/src/scripts/build_library/cgpt_shell.sh.
# Do not edit!

if ! type numsectors >/dev/null 2>&1; then
  . "/usr/share/misc/chromeos-common.sh" || exit 1
fi
locate_gpt

# Usage: create_image <device> <min_disk_size> <block_size>
# If <device> is a block device, wipes out the GPT
# If it's not, it creates a new file of the requested size
create_image() {
  local dev="$1"
  local min_disk_size="$2"
  local block_size="$3"
  if [ -b "${dev}" ]; then
    # Zap any old partitions (otherwise gpt complains).
    dd if=/dev/zero of="${dev}" conv=notrunc bs=512 count=32
    dd if=/dev/zero of="${dev}" conv=notrunc bs=512 count=33 \
      seek=$(( min_disk_size * block_size / 512 - 1 - 33 ))
  else
    if [ ! -e "${dev}" ]; then
      truncate -s "$(( min_disk_size * block_size ))" "${dev}"
    fi
  fi
}

write_base_table() {
  local target="$1"
  create_image "${target}" 22479700 512
  local curr=64
  # Create the GPT headers and tables. Pad the primary ones.
  ${GPT} create -p 0 ${target}
  local stateful_size=4194304
  if [ -b "${target}" ]; then
    stateful_size=$(( $(numsectors "${target}") - 18285396))
  fi
  : $(( stateful_size -= (stateful_size % 4096) ))
  ${GPT} add -i 11 -b ${curr} -s 16384 -t firmware -l "RWFW" ${target}
  : $(( curr += 16384 ))
  ${GPT} add -i 6 -b ${curr} -s 1 -t kernel -l "KERN-C" ${target}
  : $(( curr += 1 ))
  ${GPT} add -i 7 -b ${curr} -s 1 -t rootfs -l "ROOT-C" ${target}
  : $(( curr += 1 ))
  ${GPT} add -i 9 -b ${curr} -s 1 -t reserved -l "reserved" ${target}
  : $(( curr += 1 ))
  ${GPT} add -i 10 -b ${curr} -s 1 -t reserved -l "reserved" ${target}
  : $(( curr += 1 ))
  : $(( curr += 4028 ))
  ${GPT} add -i 2 -b ${curr} -s 32768 -t kernel -l "KERN-A" ${target}
  : $(( curr += 32768 ))
  ${GPT} add -i 4 -b ${curr} -s 32768 -t kernel -l "KERN-B" ${target}
  : $(( curr += 32768 ))
  ${GPT} add -i 8 -b ${curr} -s 32768 -t data -l "OEM" ${target}
  : $(( curr += 32768 ))
  : $(( curr += 131072 ))
  ${GPT} add -i 12 -b ${curr} -s 4194304 -t efi -l "EFI-SYSTEM" ${target}
  : $(( curr += 4194304 ))
  ${GPT} add -i 5 -b ${curr} -s 4194304 -t rootfs -l "ROOT-B" ${target}
  : $(( curr += 4194304 ))
  ${GPT} add -i 3 -b ${curr} -s 9646899 -t rootfs -l "ROOT-A" ${target}
  : $(( curr += 9646899 ))
  ${GPT} add -i 1 -b ${curr} -s ${stateful_size} -t data -l "STATE" ${target}
  : $(( curr += ${stateful_size} ))
  ${GPT} add -i 2 -S 0 -T 15 -P 15 ${target}
  ${GPT} add -i 4 -S 0 -T 15 -P 0 ${target}
  ${GPT} add -i 6 -S 0 -T 15 -P 0 ${target}
  ${GPT} boot -p -b $2 -i 12 ${target}
  ${GPT} add -i 12 -B 1 ${target}
  ${GPT} show ${target}
}
load_base_vars() {
  DEFAULT_ROOTDEV=""
  PARTITION_SIZE_RWFW=8388608
    RESERVED_EBS_RWFW=0
       DATA_SIZE_RWFW=8388608
          FORMAT_RWFW=
       FS_FORMAT_RWFW=
      FS_OPTIONS_RWFW=""
   PARTITION_NUM_RWFW="11"
  PARTITION_SIZE_11=8388608
    RESERVED_EBS_11=0
       DATA_SIZE_11=8388608
          FORMAT_11=
       FS_FORMAT_11=
      FS_OPTIONS_11=""
   PARTITION_NUM_11="11"
  PARTITION_SIZE_KERN_C=512
    RESERVED_EBS_KERN_C=0
       DATA_SIZE_KERN_C=512
          FORMAT_KERN_C=
       FS_FORMAT_KERN_C=
      FS_OPTIONS_KERN_C=""
   PARTITION_NUM_KERN_C="6"
  PARTITION_SIZE_6=512
    RESERVED_EBS_6=0
       DATA_SIZE_6=512
          FORMAT_6=
       FS_FORMAT_6=
      FS_OPTIONS_6=""
   PARTITION_NUM_6="6"
  PARTITION_SIZE_ROOT_C=512
    RESERVED_EBS_ROOT_C=0
       DATA_SIZE_ROOT_C=512
          FORMAT_ROOT_C=
       FS_FORMAT_ROOT_C=
      FS_OPTIONS_ROOT_C=""
   PARTITION_NUM_ROOT_C="7"
  PARTITION_SIZE_7=512
    RESERVED_EBS_7=0
       DATA_SIZE_7=512
          FORMAT_7=
       FS_FORMAT_7=
      FS_OPTIONS_7=""
   PARTITION_NUM_7="7"
  PARTITION_SIZE_RESERVED=512
    RESERVED_EBS_RESERVED=0
       DATA_SIZE_RESERVED=512
          FORMAT_RESERVED=
       FS_FORMAT_RESERVED=
      FS_OPTIONS_RESERVED=""
   PARTITION_NUM_RESERVED="9"
  PARTITION_SIZE_9=512
    RESERVED_EBS_9=0
       DATA_SIZE_9=512
          FORMAT_9=
       FS_FORMAT_9=
      FS_OPTIONS_9=""
   PARTITION_NUM_9="9"
  PARTITION_SIZE_RESERVED=512
    RESERVED_EBS_RESERVED=0
       DATA_SIZE_RESERVED=512
          FORMAT_RESERVED=
       FS_FORMAT_RESERVED=
      FS_OPTIONS_RESERVED=""
   PARTITION_NUM_RESERVED="10"
  PARTITION_SIZE_10=512
    RESERVED_EBS_10=0
       DATA_SIZE_10=512
          FORMAT_10=
       FS_FORMAT_10=
      FS_OPTIONS_10=""
   PARTITION_NUM_10="10"
  PARTITION_SIZE_KERN_A=16777216
    RESERVED_EBS_KERN_A=0
       DATA_SIZE_KERN_A=16777216
          FORMAT_KERN_A=
       FS_FORMAT_KERN_A=
      FS_OPTIONS_KERN_A=""
   PARTITION_NUM_KERN_A="2"
  PARTITION_SIZE_2=16777216
    RESERVED_EBS_2=0
       DATA_SIZE_2=16777216
          FORMAT_2=
       FS_FORMAT_2=
      FS_OPTIONS_2=""
   PARTITION_NUM_2="2"
  PARTITION_SIZE_KERN_B=16777216
    RESERVED_EBS_KERN_B=0
       DATA_SIZE_KERN_B=16777216
          FORMAT_KERN_B=
       FS_FORMAT_KERN_B=
      FS_OPTIONS_KERN_B=""
   PARTITION_NUM_KERN_B="4"
  PARTITION_SIZE_4=16777216
    RESERVED_EBS_4=0
       DATA_SIZE_4=16777216
          FORMAT_4=
       FS_FORMAT_4=
      FS_OPTIONS_4=""
   PARTITION_NUM_4="4"
  PARTITION_SIZE_OEM=16777216
    RESERVED_EBS_OEM=0
       DATA_SIZE_OEM=16777216
          FORMAT_OEM=
       FS_FORMAT_OEM=ext4
      FS_OPTIONS_OEM=""
   PARTITION_NUM_OEM="8"
  PARTITION_SIZE_8=16777216
    RESERVED_EBS_8=0
       DATA_SIZE_8=16777216
          FORMAT_8=
       FS_FORMAT_8=ext4
      FS_OPTIONS_8=""
   PARTITION_NUM_8="8"
  PARTITION_SIZE_EFI_SYSTEM=2147483648
    RESERVED_EBS_EFI_SYSTEM=0
       DATA_SIZE_EFI_SYSTEM=2147483648
          FORMAT_EFI_SYSTEM=
       FS_FORMAT_EFI_SYSTEM=vfat
      FS_OPTIONS_EFI_SYSTEM=""
   PARTITION_NUM_EFI_SYSTEM="12"
  PARTITION_SIZE_12=2147483648
    RESERVED_EBS_12=0
       DATA_SIZE_12=2147483648
          FORMAT_12=
       FS_FORMAT_12=vfat
      FS_OPTIONS_12=""
   PARTITION_NUM_12="12"
  PARTITION_SIZE_ROOT_B=2147483648
    RESERVED_EBS_ROOT_B=0
       DATA_SIZE_ROOT_B=2147483648
          FORMAT_ROOT_B=
       FS_FORMAT_ROOT_B=
      FS_OPTIONS_ROOT_B=""
   PARTITION_NUM_ROOT_B="5"
  PARTITION_SIZE_5=2147483648
    RESERVED_EBS_5=0
       DATA_SIZE_5=2147483648
          FORMAT_5=
       FS_FORMAT_5=
      FS_OPTIONS_5=""
   PARTITION_NUM_5="5"
  PARTITION_SIZE_ROOT_A=4939212288
    RESERVED_EBS_ROOT_A=0
       DATA_SIZE_ROOT_A=4294967296
          FORMAT_ROOT_A=
       FS_FORMAT_ROOT_A=ext2
      FS_OPTIONS_ROOT_A=""
   PARTITION_NUM_ROOT_A="3"
  PARTITION_SIZE_3=4939212288
    RESERVED_EBS_3=0
       DATA_SIZE_3=4294967296
          FORMAT_3=
       FS_FORMAT_3=ext2
      FS_OPTIONS_3=""
   PARTITION_NUM_3="3"
  PARTITION_SIZE_STATE=2147483648
    RESERVED_EBS_STATE=0
       DATA_SIZE_STATE=2147483648
          FORMAT_STATE=
       FS_FORMAT_STATE=ext4
      FS_OPTIONS_STATE=""
   PARTITION_NUM_STATE="1"
  PARTITION_SIZE_1=2147483648
    RESERVED_EBS_1=0
       DATA_SIZE_1=2147483648
          FORMAT_1=
       FS_FORMAT_1=ext4
      FS_OPTIONS_1=""
   PARTITION_NUM_1="1"
}
write_partition_table() {
  local target="$1"
  create_image "${target}" 18289492 512
  local curr=64
  # Create the GPT headers and tables. Pad the primary ones.
  ${GPT} create -p 0 ${target}
  local stateful_size=4194304
  if [ -b "${target}" ]; then
    stateful_size=$(( $(numsectors "${target}") - 14095188))
  fi
  : $(( stateful_size -= (stateful_size % 4096) ))
  ${GPT} add -i 11 -b ${curr} -s 16384 -t firmware -l "RWFW" ${target}
  : $(( curr += 16384 ))
  ${GPT} add -i 6 -b ${curr} -s 1 -t kernel -l "KERN-C" ${target}
  : $(( curr += 1 ))
  ${GPT} add -i 7 -b ${curr} -s 1 -t rootfs -l "ROOT-C" ${target}
  : $(( curr += 1 ))
  ${GPT} add -i 9 -b ${curr} -s 1 -t reserved -l "reserved" ${target}
  : $(( curr += 1 ))
  ${GPT} add -i 10 -b ${curr} -s 1 -t reserved -l "reserved" ${target}
  : $(( curr += 1 ))
  : $(( curr += 4028 ))
  ${GPT} add -i 2 -b ${curr} -s 32768 -t kernel -l "KERN-A" ${target}
  : $(( curr += 32768 ))
  ${GPT} add -i 4 -b ${curr} -s 32768 -t kernel -l "KERN-B" ${target}
  : $(( curr += 32768 ))
  ${GPT} add -i 8 -b ${curr} -s 32768 -t data -l "OEM" ${target}
  : $(( curr += 32768 ))
  : $(( curr += 131072 ))
  ${GPT} add -i 12 -b ${curr} -s 4194304 -t efi -l "EFI-SYSTEM" ${target}
  : $(( curr += 4194304 ))
  ${GPT} add -i 5 -b ${curr} -s 4096 -t rootfs -l "ROOT-B" ${target}
  : $(( curr += 4096 ))
  ${GPT} add -i 3 -b ${curr} -s 9646899 -t rootfs -l "ROOT-A" ${target}
  : $(( curr += 9646899 ))
  ${GPT} add -i 1 -b ${curr} -s ${stateful_size} -t data -l "STATE" ${target}
  : $(( curr += ${stateful_size} ))
  ${GPT} add -i 2 -S 0 -T 15 -P 15 ${target}
  ${GPT} add -i 4 -S 0 -T 0 -P 0 ${target}
  ${GPT} add -i 6 -S 0 -T 0 -P 0 ${target}
  ${GPT} boot -p -b $2 -i 12 ${target}
  ${GPT} add -i 12 -B 1 ${target}
  ${GPT} show ${target}
}
load_partition_vars() {
  DEFAULT_ROOTDEV=""
  PARTITION_SIZE_RWFW=8388608
    RESERVED_EBS_RWFW=0
       DATA_SIZE_RWFW=8388608
          FORMAT_RWFW=
       FS_FORMAT_RWFW=
      FS_OPTIONS_RWFW=""
   PARTITION_NUM_RWFW="11"
  PARTITION_SIZE_11=8388608
    RESERVED_EBS_11=0
       DATA_SIZE_11=8388608
          FORMAT_11=
       FS_FORMAT_11=
      FS_OPTIONS_11=""
   PARTITION_NUM_11="11"
  PARTITION_SIZE_KERN_C=512
    RESERVED_EBS_KERN_C=0
       DATA_SIZE_KERN_C=512
          FORMAT_KERN_C=
       FS_FORMAT_KERN_C=
      FS_OPTIONS_KERN_C=""
   PARTITION_NUM_KERN_C="6"
  PARTITION_SIZE_6=512
    RESERVED_EBS_6=0
       DATA_SIZE_6=512
          FORMAT_6=
       FS_FORMAT_6=
      FS_OPTIONS_6=""
   PARTITION_NUM_6="6"
  PARTITION_SIZE_ROOT_C=512
    RESERVED_EBS_ROOT_C=0
       DATA_SIZE_ROOT_C=512
          FORMAT_ROOT_C=
       FS_FORMAT_ROOT_C=
      FS_OPTIONS_ROOT_C=""
   PARTITION_NUM_ROOT_C="7"
  PARTITION_SIZE_7=512
    RESERVED_EBS_7=0
       DATA_SIZE_7=512
          FORMAT_7=
       FS_FORMAT_7=
      FS_OPTIONS_7=""
   PARTITION_NUM_7="7"
  PARTITION_SIZE_RESERVED=512
    RESERVED_EBS_RESERVED=0
       DATA_SIZE_RESERVED=512
          FORMAT_RESERVED=
       FS_FORMAT_RESERVED=
      FS_OPTIONS_RESERVED=""
   PARTITION_NUM_RESERVED="9"
  PARTITION_SIZE_9=512
    RESERVED_EBS_9=0
       DATA_SIZE_9=512
          FORMAT_9=
       FS_FORMAT_9=
      FS_OPTIONS_9=""
   PARTITION_NUM_9="9"
  PARTITION_SIZE_RESERVED=512
    RESERVED_EBS_RESERVED=0
       DATA_SIZE_RESERVED=512
          FORMAT_RESERVED=
       FS_FORMAT_RESERVED=
      FS_OPTIONS_RESERVED=""
   PARTITION_NUM_RESERVED="10"
  PARTITION_SIZE_10=512
    RESERVED_EBS_10=0
       DATA_SIZE_10=512
          FORMAT_10=
       FS_FORMAT_10=
      FS_OPTIONS_10=""
   PARTITION_NUM_10="10"
  PARTITION_SIZE_KERN_A=16777216
    RESERVED_EBS_KERN_A=0
       DATA_SIZE_KERN_A=16777216
          FORMAT_KERN_A=
       FS_FORMAT_KERN_A=
      FS_OPTIONS_KERN_A=""
   PARTITION_NUM_KERN_A="2"
  PARTITION_SIZE_2=16777216
    RESERVED_EBS_2=0
       DATA_SIZE_2=16777216
          FORMAT_2=
       FS_FORMAT_2=
      FS_OPTIONS_2=""
   PARTITION_NUM_2="2"
  PARTITION_SIZE_KERN_B=16777216
    RESERVED_EBS_KERN_B=0
       DATA_SIZE_KERN_B=16777216
          FORMAT_KERN_B=
       FS_FORMAT_KERN_B=
      FS_OPTIONS_KERN_B=""
   PARTITION_NUM_KERN_B="4"
  PARTITION_SIZE_4=16777216
    RESERVED_EBS_4=0
       DATA_SIZE_4=16777216
          FORMAT_4=
       FS_FORMAT_4=
      FS_OPTIONS_4=""
   PARTITION_NUM_4="4"
  PARTITION_SIZE_OEM=16777216
    RESERVED_EBS_OEM=0
       DATA_SIZE_OEM=16777216
          FORMAT_OEM=
       FS_FORMAT_OEM=ext4
      FS_OPTIONS_OEM=""
   PARTITION_NUM_OEM="8"
  PARTITION_SIZE_8=16777216
    RESERVED_EBS_8=0
       DATA_SIZE_8=16777216
          FORMAT_8=
       FS_FORMAT_8=ext4
      FS_OPTIONS_8=""
   PARTITION_NUM_8="8"
  PARTITION_SIZE_EFI_SYSTEM=2147483648
    RESERVED_EBS_EFI_SYSTEM=0
       DATA_SIZE_EFI_SYSTEM=2147483648
          FORMAT_EFI_SYSTEM=
       FS_FORMAT_EFI_SYSTEM=vfat
      FS_OPTIONS_EFI_SYSTEM=""
   PARTITION_NUM_EFI_SYSTEM="12"
  PARTITION_SIZE_12=2147483648
    RESERVED_EBS_12=0
       DATA_SIZE_12=2147483648
          FORMAT_12=
       FS_FORMAT_12=vfat
      FS_OPTIONS_12=""
   PARTITION_NUM_12="12"
  PARTITION_SIZE_ROOT_B=2097152
    RESERVED_EBS_ROOT_B=0
       DATA_SIZE_ROOT_B=2097152
          FORMAT_ROOT_B=
       FS_FORMAT_ROOT_B=
      FS_OPTIONS_ROOT_B=""
   PARTITION_NUM_ROOT_B="5"
  PARTITION_SIZE_5=2097152
    RESERVED_EBS_5=0
       DATA_SIZE_5=2097152
          FORMAT_5=
       FS_FORMAT_5=
      FS_OPTIONS_5=""
   PARTITION_NUM_5="5"
  PARTITION_SIZE_ROOT_A=4939212288
    RESERVED_EBS_ROOT_A=0
       DATA_SIZE_ROOT_A=4294967296
          FORMAT_ROOT_A=
       FS_FORMAT_ROOT_A=ext2
      FS_OPTIONS_ROOT_A=""
   PARTITION_NUM_ROOT_A="3"
  PARTITION_SIZE_3=4939212288
    RESERVED_EBS_3=0
       DATA_SIZE_3=4294967296
          FORMAT_3=
       FS_FORMAT_3=ext2
      FS_OPTIONS_3=""
   PARTITION_NUM_3="3"
  PARTITION_SIZE_STATE=2147483648
    RESERVED_EBS_STATE=0
       DATA_SIZE_STATE=2147483648
          FORMAT_STATE=
       FS_FORMAT_STATE=ext4
      FS_OPTIONS_STATE=""
   PARTITION_NUM_STATE="1"
  PARTITION_SIZE_1=2147483648
    RESERVED_EBS_1=0
       DATA_SIZE_1=2147483648
          FORMAT_1=
       FS_FORMAT_1=ext4
      FS_OPTIONS_1=""
   PARTITION_NUM_1="1"
}
ROOTFS_PARTITION_SIZE=4939212288
