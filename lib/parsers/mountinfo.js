MountInfo = {
	
	expressionGroups: [
		"mountId",
		"parentId",
		"major",
		"minor",
		"root",
		"mountPoint",
		"mountOptions",
		"optionalFields",
		"separator",
		"filesystemType",
		"mountSource",
		"superOptions"
	]	
}

/*


36 35 98:0 /mnt1 /mnt2 rw,noatime master:1 - ext3 /dev/root rw,errors=continue
(1)(2)(3)   (4)   (5)      (6)      (7)   (8) (9)   (10)         (11)

The numbers in parentheses are labels for the descriptions
below:

(1)  mount ID: unique identifier of the mount (may be reused
   after umount(2)).

(2)  parent ID: ID of parent mount (or of self for the top of
   the mount tree).

(3)  major:minor: value of st_dev for files on filesystem (see
   stat(2)).

(4)  root: root of the mount within the filesystem.

(5)  mount point: mount point relative to the process's root.

(6)  mount options: per-mount options.

(7)  optional fields: zero or more fields of the form
   "tag[:value]".

(8)  separator: marks the end of the optional fields.

(9)  filesystem type: name of filesystem in the form
   "type[.subtype]".

(10) mount source: filesystem-specific information or "none".

(11) super options: per-super block options.

*/