
let Recorder = function() {
    this.config = {
        sampleBits: 16,         // 采样数位 8, 16
        sampleRate: 16000       // 采样率(1/6 44100)
    };
    this.size = 0;          //录音文件长度
    this.buffer = [];     //录音缓存
    this.input = function (data) {
        this.buffer.push(new Float32Array(data));
        this.size += data.length;
    };
};

Recorder.prototype.ready = function() {
    this.context = new (window.webkitAudioContext || window.AudioContext)();
    this.createScript = this.context.createScriptProcessor || this.context.createJavaScriptNode;
    this.recorder = this.createScript.apply(this.context, [4096, 1, 1]);


    // 音频采集
    this.recorder.onaudioprocess = e => {
        this.input(e.inputBuffer.getChannelData(0));
        console.log(1111);
        //record(e.inputBuffer.getChannelData(0));
    }

    return navigator.mediaDevices.getUserMedia({
            audio: true          //只启用音频
        }).then(stream => {
            this.audioInput = this.context.createMediaStreamSource(stream);
            // callback(rec);
        }, error => {
            switch (error.code || error.name) {
                case 'PERMISSION_DENIED':
                case 'PermissionDeniedError':
                    HZRecorder.throwError('用户拒绝提供信息。');
                    break;
                case 'NOT_SUPPORTED_ERROR':
                case 'NotSupportedError':
                    HZRecorder.throwError('浏览器不支持硬件设备。');
                    break;
                case 'MANDATORY_UNSATISFIED_ERROR':
                case 'MandatoryUnsatisfiedError':
                    HZRecorder.throwError('无法发现指定的硬件设备。');
                    break;
                default:
                    HZRecorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));
                    break;
            }
        });
};

Recorder.prototype.start = function(stream) {
    // 清空数据
    this.buffer = [];
    this.size = 0;

    this.audioInput.connect(this.recorder);
    this.recorder.connect(this.context.destination);

    
    this.inputSampleRate = this.context.sampleRate,    //输入采样率
    this.inputSampleBits = 16,       //输入采样数位 8, 16
    this.outputSampleRate = this.config.sampleRate;    //输出采样率
    this.oututSampleBits = this.config.sampleBits;       //输出采样数位 8, 16
};

Recorder.prototype.stop = function () {
    this.recorder.disconnect();
}

Recorder.prototype.getBlob = function () {
    this.stop();
    return this.encodeWAV();
}

Recorder.prototype.play = function (audio) {
    audio.src = window.URL.createObjectURL(this.getBlob());
}
Recorder.prototype.compress = function () { //合并压缩
    //合并
    var data = new Float32Array(this.size);
    var offset = 0;
    for (var i = 0; i < this.buffer.length; i++) {
        data.set(this.buffer[i], offset);
        offset += this.buffer[i].length;
    }
    //压缩
    var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
    var length = data.length / compression;
    var result = new Float32Array(length);
    var index = 0, j = 0;
    while (index < length) {
        result[index] = data[j];
        j += compression;
        index++;
    }
    return result;
};
Recorder.prototype.encodeWAV = function () {
    var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
    var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
    var bytes = this.compress();
    var dataLength = bytes.length * (sampleBits / 8);
    var buffer = new ArrayBuffer(44 + dataLength);
    var data = new DataView(buffer);

    var channelCount = 1;//单声道
    var offset = 0;

    var writeString = function (str) {
        for (var i = 0; i < str.length; i++) {
            data.setUint8(offset + i, str.charCodeAt(i));
        }
    }

    // 资源交换文件标识符 
    writeString('RIFF'); offset += 4;
    // 下个地址开始到文件尾总字节数,即文件大小-8 
    data.setUint32(offset, 36 + dataLength, true); offset += 4;
    // WAV文件标志
    writeString('WAVE'); offset += 4;
    // 波形格式标志 
    writeString('fmt '); offset += 4;
    // 过滤字节,一般为 0x10 = 16 
    data.setUint32(offset, 16, true); offset += 4;
    // 格式类别 (PCM形式采样数据) 
    data.setUint16(offset, 1, true); offset += 2;
    // 通道数 
    data.setUint16(offset, channelCount, true); offset += 2;
    // 采样率,每秒样本数,表示每个通道的播放速度 
    data.setUint32(offset, sampleRate, true); offset += 4;
    // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8 
    data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
    // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8 
    data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
    // 每样本数据位数 
    data.setUint16(offset, sampleBits, true); offset += 2;
    // 数据标识符 
    writeString('data'); offset += 4;
    // 采样数据总数,即数据总大小-44 
    data.setUint32(offset, dataLength, true); offset += 4;
    // 写入采样数据 
    if (sampleBits === 8) {
        for (var i = 0; i < bytes.length; i++, offset++) {
            var s = Math.max(-1, Math.min(1, bytes[i]));
            var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
            val = parseInt(255 / (65535 / (val + 32768)));
            data.setInt8(offset, val, true);
        }
    } else {
        for (var i = 0; i < bytes.length; i++, offset += 2) {
            var s = Math.max(-1, Math.min(1, bytes[i]));
            data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    }

    return new Blob([data], { type: 'audio/wav' });
}

export default Recorder;