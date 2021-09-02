<template>
  <div class="createApp-container">
    <div class="createApp-inner">
      <div class="createApp-title">
        <a-icon @click="handleGoBack" type="left" style="font-size: 18px; margin-right: 5px; cursor: pointer;"/>
        <span class="title-name">添加应用</span>
      </div>
			<div class="createApp-tables">
				<a-steps :current="current">
					<a-step v-for="item in steps" :key="item.title" :title="item.title" />
				</a-steps>
				<div class="steps-content">
					<el-form v-if="current == 0" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="应用名称：" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入应用名称"></el-input>
						</el-form-item>
						<el-form-item label="应用类型：" prop="appType">
							<el-select v-model="ruleForm.appType" placeholder="请选择应用类型">
								<el-option label="游戏" value="GAME"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="应用描述：" prop="description">
							<el-input type="textarea" v-model="ruleForm.description" placeholder="请输入应用描述"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button class="registered-btn" type="primary" @click="submitForm('ruleForm')">注册</el-button>
						</el-form-item>
					</el-form>
					<el-form v-if="current == 1" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="应用名称：">
							{{ ruleForm.name }}
						</el-form-item>
						<el-form-item label="应用类型：">
							{{ ruleForm.appType }}
						</el-form-item>
						<el-form-item label="应用描述：">
							<el-input type="textarea" v-model="ruleForm.description" placeholder="请输入应用描述"></el-input>
						</el-form-item>
						<el-form-item label="AppKey：">
							{{ ruleForm.appKey }}
						</el-form-item>
						<el-form-item label="AppSecret：">
							{{ ruleForm.appSecret }}
						</el-form-item>
						<el-form-item>
							<el-button class="registered-btn" type="primary" @click="submitForm2">下一步</el-button>
						</el-form-item>
					</el-form>
					<div class="downSdk-container" v-if="current == 2">
						<div class="downSdk-title">华捷艾米应用统计SDK</div>
						<!-- <el-button class="downSdk-btn" type="primary" icon="el-icon-download">下载SDK</el-button> -->
						<a-button class="downSdk-btn" type="primary" icon="download" size="large">
							<a style="color: #fff; margin: 0 5px;" href="http://statistics.game.internal.cloud.hjimi.com/Event_Tracking_Common-release.aar" >下载SDK</a>
						</a-button>
						<div class="downSdk-desc">
							<el-link type="primary">查看接入说明</el-link>
						</div>
						<a-button class="downSdk-back" @click="goBackToLists">返回</a-button>
					</div>
				</div>
				<!-- <div class="steps-action">
					<a-button v-if="current < steps.length - 1" type="primary" @click="next">
						Next
					</a-button>
					<a-button
						v-if="current == steps.length - 1"
						type="primary"
						@click="$message.success('Processing complete!')"
					>
						Done
					</a-button>
					<a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
						Previous
					</a-button>
				</div> -->
			</div>
    </div>
  </div>
</template>

<script>
import { AddToGmApp, getGmAppInfo } from '@/api/lists'

export default {
  name: "CreateApp",
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "注册应用",
        },
        {
          title: "生成AppKey",
        },
        {
          title: "下载SDK",
        },
      ],
      ruleForm: {
        name: "",
        appType: "GAME",
        description: "",
        appKey: "",
        appSecret: "",
        language: 'CHINESE',
        platType: 'ANDROID',
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
        ],
        // appType: [
        //   { required: true, message: "请选择应用类型", trigger: "change" },
        // ],
        // description: [{ required: true, message: "请填写应用描述", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleGoBack() {
      this.$router.push({
        path: '/'
      })
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    submitForm2() {
      this.current++;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res;
          let formData = JSON.parse(JSON.stringify(this[formName]))
          delete formData.appKey;
          delete formData.appSecret;
          try {
            res = await AddToGmApp(formData)
          } catch (error) {
            console.log(error)
          } 
          let { code } = res;
          if ( code == 0 ) {
            // 做些什么
            this.current++;
            const dataId = res.data;
            // 去请求详情
            let resInfo;
            try {
              resInfo = await getGmAppInfo(dataId)
            } catch (error) {
              console.log(error)
            }
            let { code } = resInfo;
            if ( code == 0 ) {
              console.log(resInfo.data)
              this.ruleForm.appKey = resInfo.data.appkey;
              this.ruleForm.appSecret = resInfo.data.appsecret;
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
		goBackToLists() {
			this.$router.push({
				path: '/applicationManagement/lists'
			})
		}
  },
};
</script>

<style lang="scss" scoped>
.createApp-container {
  width: 100%;
  max-width: 1440px;
  min-width: 1280px;
  margin: 0 auto;
  .createApp-inner {
    height: 100%;
    margin: 0 175px;

    .createApp-title {
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

    .createApp-tables {
      overflow: hidden;
      margin-top: 30px;
      width: 100%;
      height: 744px;
      background: #fff;
      border-radius: 5px;
      background: #fff;
      padding: 0 16px;
      .steps-content {
        padding-top: 64px;
        .registered-btn {
          padding: 8px 20px;
        }
        .downSdk-container {
          width: 460px;
          margin: 0 auto;
          .downSdk-title {
            color: #000;
            font-weight: 600;
            text-align: center;
            font-size: 16px;
          }
          .downSdk-btn {
            display: block;
            margin: 35px auto 36px;
          }
          .downSdk-desc {
            text-align: center;
            margin: 0 auto;
          }
					.downSdk-back {
						display: block;
						margin: 155px auto 0;
					}
        }
      }
      .steps-action {
        margin-top: 24px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.ant-steps {
  margin-top: 30px;
  padding: 0 80px;
}
.el-form {
  width: 460px;
  margin: 0 auto;
}
</style>