import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import * as moment from 'moment';
import * as util from 'util';

@Injectable({ providedIn: 'root' })

export class AuditService {
  mainFileDir = '';
  subFileDir = '';
  sessionFileName = '';
  externalRootDir = null;

  constructor(
    private file: File
  ) {
    this.externalRootDir = this.file.externalRootDirectory;
  }

  info(_data = null) { this.setRootParam(this.writeArray.apply(null, arguments)); }
  debug(_data = null) { this.setRootParam(this.writeArray.apply(null, arguments)); }
  warning(_data = null) { this.setRootParam(this.writeArray.apply(null, arguments)); }
  err(_data = null) { this.setRootParam(this.writeArray.apply(null, arguments)); }

  writeArray() {
    const errStackLineArr = new Error().stack.split('\n');
    // Debug level called 'info', 'debug', 'warn', 'error'
    const debugLevel = errStackLineArr[2].trim().split(' ').splice(-2, 1).pop().split('.').pop();

    // Callee function of the debug function
    const calleeLine = errStackLineArr[3].trim().split(' ').splice(1);
    const fileLineStr = errStackLineArr[3].trim().split(' ').pop();
    let callee = '';
    if (calleeLine.length == 1) {
      callee = calleeLine.pop().split(':').reverse().splice(2).shift().split('/').pop()
    } else {
      callee = calleeLine.reverse().splice(1).reverse().join(' ').split('/').pop()
    }

    // File & the line of the callee
    let [file, line] = fileLineStr.split('/').pop().split(':').splice(0, 2);

    const writeArray = [
      moment(new Date()).format('YYYY/MM/DD-HH:mm:ss:SSS').toString(), // Time log
      debugLevel, file, line, callee
    ];
    for (const arg of arguments) {
      if (arg !== undefined) {
        writeArray.push(arg);
      }
    }
    return writeArray;
  }

  checkMainDir(data) {
    if (this.externalRootDir) {
      this.file.checkDir(this.externalRootDir, 'leafletIonic').then(() => {
        this.checkDirDate(data);
      }).catch(err => {
        this.file.createDir(this.externalRootDir, 'leafletIonic', true).then(a => {
          this.checkDirDate(data);
        });
      });
    } else { console.log(data); }
  }

  checkDirDate(data) {
    this.file.checkDir(this.mainFileDir, moment(new Date()).format('YYYYMM').toString()).then(() => {
      this.checkSessionFile(data);
    }).catch(err => {
      this.file.createDir(this.mainFileDir, moment(new Date()).format('YYYYMM').toString(), true).then(a => {
        this.checkSessionFile(data);
      });
    });
  }

  checkSessionFile(data) {
    this.file.checkFile(this.subFileDir, moment(new Date()).format('YYYYMMDD').toString()).then(() => {
      this.writeData(data);
    }).catch(err => {
      this.file.createFile(this.subFileDir, this.sessionFileName, true).then(a => {
        this.writeData(data);
      });
    });
  }

  writeData(data) {
    this.file.writeFile(this.subFileDir, this.sessionFileName, data + '\n', { append: true, replace: false });
  }

  setRootParam(data) {
    if (this.externalRootDir) {
      if (this.externalRootDir !== null) {
        this.mainFileDir = this.externalRootDir + 'leafletIonic/';
        this.subFileDir = this.mainFileDir + moment(new Date()).format('YYYYMM');
        this.sessionFileName = moment(new Date()).format('YYYYMMDD').toString() + '.txt';
        this.checkMainDir(this.printable(data));
      } else {
        // File module is not supported; let's write output to console log
        console.log(this.printable(data));
      }
    } else {
      console.log(this.printable(data));
    }
  }

  printable(data) {
    let printableData = [];

    if (typeof data == 'string') {
      printableData.push(data);
    } else if (data instanceof Array) {
      printableData = data.map((e) => { return this.printable(e) })
    } else if (data instanceof Object) {
      printableData.push(util.inspect(data));
    } else {
      printableData.push(util.inspect(data));
    }

    return printableData.join(', ');
  }
}
