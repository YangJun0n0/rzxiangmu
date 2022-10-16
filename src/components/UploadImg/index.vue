<template>
  <div>
    <el-upload
      v-loading="loading"
      class="UploadImg"
      action="#"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="httpRequest"
      :limit="1"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="previewDialog"
      width="50%"
    >
      <img style="width:100%" :src="previewImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDWyR2TJ2YprlZBGC4tZ1ENTn085rQpcGh',
  SecretKey: 'GI5d5NSLhsoZ5NbmugJxgL1d8Y3Sku4Y'
})
export default {
  name: 'UploadImg',
  props: {
    datauleUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fileList: [

      ],
      previewDialog: false,
      previewImgUrl: '',
      loading: false
    }
  },
  watch: {
    datauleUrl() {
      this.fileList.push({
        name: 'default',
        url: this.datauleUrl
      })
    }
  },
  methods: {
    onPreview(file) {
      this.previewDialog = true
      this.previewImgUrl = file.url
    },
    onRemove(file, fileList) {
      // console.log('点击删除')
      this.fileList = fileList
    },
    // onChange 会触发两次上传本地上传，和服务器上传
    onChange(file, fileList) {
      this.fileList = fileList
    },
    // 1.本地选择上传原来有一个数据+选择的数据
    // 2.请求上传成功/失败原来有一个数据
    httpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'yangjun0o0-1314348584', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) { // 进度条
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // err上传失败的信息如果上传成功err为nuLL
        // data上传成功的信息
        // console.log(err || data)
        this.loading = false
        if (err) return this.$message.error('图片上传失败')
        this.$emit('on-success', {
          imgUrl: 'https://' + data.Location // 上传成功后的地址
        })
      })
    },
    beforeUpload(file) {
      const imgType = ['image/jpeg', 'image/gif', 'image/png']
      if (!imgType.includes(file.type)) {
        this.$message.error('上传图片只能是' + imgType.join(',') + '类型')
        return false
      }
      const maxSize = 1 * 1024 * 1024
      console.log(maxSize < file.size)
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.UploadImg{
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
