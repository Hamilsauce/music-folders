import { FileModel, createFile } from '../models/file.model.js';



const fileJSON = JSON.stringify({
  "Name": "WWM Horns 0002 [2019-10-06 192723].wav",
  "Extension": "WAV",
  "DateAccessed": "2021-12-12T14:31:34.3571213",
  "DateModified": "2019-10-06T19:27:23",
  "DateCreated": "2021-12-12T14:31:34.3571213",
  "ContentType": "audio\/wav",
  "Kind": "File",
  "Size": 40533548,
  "Hidden": false,
  "System": false,
  "Directory": false,
  "Archive": true,
  "Device": false,
  "Offline": false,
  "ChangeTime": "2022-01-02T15:51:30.6822731",
  "FolderPath": "C:\\Users\\jacob\\OneDrive - Sea Hag Enterprises\\Documents\\Ableton\\User Library\\Samples\\Recorded\\",
  "Index": 3990,
  "Compressed": false
});

export class ExtendedFile extends FileModel {
  constructor(data) {
    super(data)
    this.rootDir = this.path
    this.path = this.FolderPath
  };

  static isFile(target) {
    return target == FileModel
  }
  static isExtendedFile(target) {
    return target === ExtendedFile
  }

  get prop() { return this._prop };
  set prop(newValue) { this._prop = newValue };
}

const exFiles = [
  new ExtendedFile(JSON.parse(fileJSON)),
  new ExtendedFile(JSON.parse(fileJSON)),
  new ExtendedFile(JSON.parse(fileJSON)),
];
const files = [
  new FileModel(JSON.parse(fileJSON)),
  new FileModel(JSON.parse(fileJSON)),
  new FileModel(JSON.parse(fileJSON)),
];


const allFiles = [...exFiles, ...files];
const allProtos = allFiles.reduce((acc, curr, i) => {
  let proto = curr.__proto__
  let protoName = proto.constructor.name;
  let protos = []
  let lastProto = proto
  // let proto = proto

  if ([null, undefined, (proto.constructor.name === 'Object')].includes(proto.__proto__)) {

    return acc
  }
  // console.log('proto',  lastProto)

  while (![null, undefined].includes(lastProto.constructor.name)) {
    // console.log('proto', lastProto)
    // protos = [...protos, protoName]

    if (!acc.has(lastProto)) {
      acc.set(lastProto, [curr])
    } else acc.set(lastProto, [...acc.get(lastProto), curr])

    lastProto = lastProto.__proto__;
    if (lastProto === null) {
      break
    }
  }
  return acc


}, new Map());

// console.log('allProtos', [...allProtos]);
const file = new ExtendedFile(JSON.parse(fileJSON))

// console.log(file.__proto__)
// console.log(file.__proto__.constructor.name)

let proto = file.__proto__
let protos = []
while (proto !== null) {
  protos = [...protos, proto.constructor.name];
  proto = proto.__proto__;
}




// console.log('PROTOS', protos);

// console.log('file.isFile()', ExtendedFile.isFile(file))
// console.log('file.isExtendedFile()', ExtendedFile.isExtendedFile(file))

let path = 'C:\\Users\\jacob\\OneDrive - Sea Hag Enterprises\\Documents\\Ableton\\User Library\\Samples\\Recorded\\';
let rootpath = 'C:\\Users\\jacob\\OneDrive - Sea Hag Enterprises\\'
path = path.split(rootpath)[1];
// console.log('rootpath', path)