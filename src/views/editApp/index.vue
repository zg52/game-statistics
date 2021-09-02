<template>
  <div class="editApp-container">
    <div class="editApp-inner">
      <div class="editApp-title">
        <a-icon @click="handleGoBack" type="left" style="font-size: 18px; margin-right: 5px; cursor: pointer;"/>
        <span class="title-name">编辑应用</span>
      </div>
			<div class="editApp-tables">
        <div class="tables-title">
          <span>基础设置</span>
        </div>
        <div class="tables-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="应用名称：" prop="name">
							<el-input v-model="ruleForm.name" placeholder="example"></el-input>
						</el-form-item>
            <el-form-item label="平台：">
							{{ ruleForm.platType }}
						</el-form-item>
            <el-form-item label="AppKey：">
							{{ ruleForm.appKey }}
						</el-form-item>
            <el-form-item label="AppSecret：">
							{{ ruleForm.appSecret }}
						</el-form-item>
            <el-form-item label="创建时间：">
							{{ ruleForm.createTime }}
						</el-form-item>
            <el-form-item label="应用语言：">
							{{ ruleForm.language }}
						</el-form-item>
						<el-form-item label="应用类型：">
							{{ ruleForm.appType }}
						</el-form-item>
						<el-form-item label="应用描述：">
							<el-input type="textarea" v-model="ruleForm.description" placeholder="请输入应用描述"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button class="registered-btn" type="primary" @click="submitForm('ruleForm')">修改</el-button>
						</el-form-item>
					</el-form>
        </div>
			</div>	
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { editGmApp } from '@/api/lists';

export default {
  name: "EditApp",
  data() {
    return {
      ruleForm: {
        id: "",
        name: "",
        appType: "game",
        description: "",
        appKey: "",
        appSecret: "",
        language: 'chinese',
        platType: 'android',
        createTime: ''
      },
      rules: {
        name: [
          { required: true, message: "请输入应用名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ]
      },
    }
  },
  computed: {
    ...mapGetters(["applicationInfo"]),
  },
  methods: {
    handleGoBack() {
      this.$router.push({
        path: '/'
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res;
          let formData = JSON.parse(JSON.stringify(this[formName]))
          delete formData.appKey;
          delete formData.createTime;
          delete formData.platType;
          for(let i in formData) {
            if (formData[i] == '--') {
              formData[i] = null;
            }
          }
          try {
            res = await editGmApp(formData)
          } catch (error) {
            console.log(error)
          } 
          let { code } = res;
          if ( code == 0 ) {
            this.$message.success('编辑成功')
            // this.$message.error('请选择gif、jpeg、jpg、png等格式的图片')
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    const { id, description, language, name, appkey, appType, createTime, platType, appsecret } = JSON.parse(this.applicationInfo);
    this.ruleForm.id = id;
    this.ruleForm.name = name;
    this.ruleForm.description = description;
    this.ruleForm.appKey = appkey;
    this.ruleForm.appType = appType.toLocaleUpperCase();
    this.ruleForm.language = language.toLocaleUpperCase();
    this.ruleForm.createTime = createTime;
    this.ruleForm.platType = platType;
    this.ruleForm.appSecret = appsecret;
  }
};
</script>

<style lang="scss" scoped>
.editApp-container {
  width: 100%;
  max-width: 1440px;
  min-width: 1280px;
  margin: 0 auto;
  .editApp-inner {
    height: 100%;
    margin: 0 175px;

    .editApp-title {
      width: 100%;
      height: 73px;
      background: #fff;
      line-height: 73px;
      padding-left: 24px;
      .title-name {
        color: #000;
        font-size: 20px;
        font-weight: 500px;
      }
    }

    .editApp-tables {
      overflow: hidden;
      margin-top: 30px;
      width: 100%;
      height: 744px;
      background: #fff;
      border-radius: 5px;
      background: #fff;
      padding: 0 16px;
      .tables-title {
        padding-top: 16px;

      }
    }
  }
}
</style>

<style lang="scss" scoped>
.el-form {
  width: 460px;
  margin-top: 30px;
  margin-left: 50px;
}
</style>