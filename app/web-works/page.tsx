import React from 'react';
import SubFirstsView from '../components/SubFirstView';
import Container from '../components/Container';
import { Card, CardContent, CardFooter, CardHeader } from '../components/Card';
import Image from 'next/image';
import Button from '../components/Button';
import Headings from '../components/Headings';

const WebWorksPage: React.FC = () => {
    const works = [
        {
            title: 'LCMアトリエ様',
            description: '結婚式ムービー制作会社のホームページ',
            url: 'https://lcm-atelier.com/',
            imageUrl: '/lcm.png'
        },
        {
            title: 'Beauty Match',
            description: '美容系マッチングアプリのウェブサイト',
            url: 'https://beautymatch.net/',
            imageUrl: '/beauty-match.png'
        },
        {
            title: 'Ring Ring',
            description: '出張型結婚式ムービー制作サイト',
            url: 'https://wedding.impre.jp/',
            imageUrl: '/ring-ring.png'
        },
        {
            title: 'Beer Rock Fes',
            description: 'ビールフェスの公式サイト',
            url: '',
            imageUrl: '/beer-fes.png'
        },
    ]

    const applications = [
        {
            title: 'Webアンケートシステムの開発',
            description: '社内向けアンケートを管理するウェブアプリケーションを作成しました',
            // url: 'https://lcm-atelier.com/',
            imageUrl: '/cultivate-survey.png'
        },
        {
            title: 'Re-creators camp',
            description: 'ゲーム素材共有サイトの構築をいたしました。',
            url: 'https://recreators-camp.com/',
            imageUrl: '/re-creators-camp.png'
        },
        {
            title: '交通事故慰謝料計算LINE Bot',
            description: '交通事故慰謝料を自動で計算し、弁護士事務所の問い合わせを増やすシステムを開発しました。',
            // url: 'https://wedding.impre.jp/',
            imageUrl: '/law-claim.png'
        },
    ]

    return (
        <div>
            <main className="mt-20">
                <SubFirstsView title='Web制作事業' backgroundUrl='/web-works-bg.png' />
                <Container>
                    <p className="text-center max-w-2xl mx-auto mb-8">
                        私たちのWeb制作事業では、クライアントのニーズに応じたカスタムソリューションを提供しています。<br />
                        ウェブサイト制作のみならず、Webシステムの開発を行なっております。
                    </p>
                </Container>
                <Container>
                    <Headings className="mb-8" level={2}>
                        Webサイト制作実績
                    </Headings>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {works.map((work, index) => (
                            <Card key={index} className='bg-gray-800'>
                                <CardHeader>{work.title}</CardHeader>
                                <CardContent>
                                    <Image src={work.imageUrl} alt={work.title} width={400} height={300} />
                                    <div className="">
                                        <p className="mb-4">{work.description}</p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {work.url && (
                                        <Button href={work.url} className="">
                                            詳細を見る
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </Container>
                <Container>
                    <Headings className="mb-8" level={2}>
                        アプリケーション制作実績
                    </Headings>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {applications.map((work, index) => (
                            <Card key={index} className='bg-gray-800'>
                                <CardHeader>{work.title}</CardHeader>
                                <CardContent>
                                    <Image src={work.imageUrl} alt={work.title} width={400} height={300} />
                                    <div className="">
                                        <p className="mb-4">{work.description}</p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {work.url && (
                                        <Button href={work.url} className="">
                                            詳細を見る
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </Container>
            </main>
        </div>
    );
};

export default WebWorksPage;
