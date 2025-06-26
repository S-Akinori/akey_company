import Button from "./Button";
import { Card, CardContent, CardFooter, CardHeader } from "./Card";
import Headings from "./Headings";

export const ServiceSection = () => {
  return (
    <div>
        <Headings level={2} className="text-center mb-4">事業紹介</Headings>
        <div className="flex justify-center relative flex-col md:flex-row gap-4">
            <div>
                <Card className="bg-gray-800 h-full">
                    <CardHeader><h3>Web制作事業</h3></CardHeader>
                    <CardContent>
                        <p>
                            Webサイトの企画・設計からデザイン、開発までを一貫して提供します。<br />
                            クライアントのビジョンを形にするための最適なソリューションを提案します。
                        </p>
                    </CardContent>
                    <CardFooter className="text-center">
                        <Button href="web-works">事例を見る</Button>
                    </CardFooter>
                </Card>
            </div>
            <div>
                <Card className="bg-gray-800 h-full">
                    <CardHeader><h3>日用雑貨の販売</h3></CardHeader>
                    <CardContent>
                        <p>
                            他では手に入らない、「あったらいいな」と思える商品を扱っています
                        </p>
                    </CardContent>
                    <CardFooter className="text-center">
                        <Button href="https://akey33.base.shop/">オンラインショップへ</Button>
                    </CardFooter>
                </Card>
            </div>
            <div>
                <Card className="bg-gray-800 h-full">
                    <CardHeader><h3>教育事業</h3></CardHeader>
                    <CardContent>
                        <p>
                            大学受験向けの完全成果報酬のオンライン学習サービス「合格への道」を展開しております。
                        </p>
                    </CardContent>
                    <CardFooter className="text-center">
                        <Button href="https://a-key33.com">公式ページへ</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default ServiceSection;