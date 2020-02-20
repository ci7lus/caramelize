import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"
import { Post } from "~/types/struct"
import { PostCard } from "~/components/commons/PostCard"

export const ThePrivacyPolicy = tsx.component({
  name: "ThePrivacyPolicy",

  render(): VNode {
    return (
      <div class="container mx-auto max-w-screen-md">
        <div class="p-4 leading-relaxed">
          <h1 class="border-b border-l-4 border-gray-400 pl-2 py-1 mb-2 font-bold">
            プライバシーポリシー
          </h1>
          <p>
            当サイトにおける利用者の個人情報の取り扱いにおいて、以下の通りプライバシーポリシーを定めます。
            <br />
            プライバシーポリシーは予告なく変更されることがあります。
          </p>
          <p class="my-2 pl-2 border-l-2 border-gray-400 font-bold">
            アクセス解析ツールについて
          </p>
          <p>
            当サイトでは、サイト運営者がよりよいコンテンツを提供するために、Google
            Analytics によるトラフィック情報の収集を行なっております。
            <br />
            その際、利用者の匿名のままの識別を可能にするために Cookie
            が利用されることがあります。これは利用者各位においてブラウザーの設定等で無効にすることで、拒否することができます。
          </p>
        </div>
      </div>
    )
  },
})
