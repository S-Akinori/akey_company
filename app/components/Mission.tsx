import React from 'react';
import Headings from './Headings';
import FadeIn from './fadeIn';

const MissionSection: React.FC = () => {
    return (
        <div className="p-8 flex flex-col items-center relative">
            <Headings level={2} className="text-center mb-4">「暮らし・学び・未来をもっと便利に、もっと面白く。」</Headings>
            <FadeIn delay={300}>
                <p className="text-center max-w-2xl">
                    私たちは、日常を支えるアイデア雑貨から、未来を切り拓く学びのサポート、そして企業や個人の挑戦を形にするWeb制作まで、多岐にわたる分野で価値を提供しています。<br />
                    共通するのは、「ひとの想い」に寄り添いながら、それを実現する“仕組み”や“しくみ”をデザインする姿勢。<br />
                    特許取得のユニークな日用品も、受験生の力を引き出す学習サービスも、目的に応じたWebサイトも、すべては「あるといいな」をカタチにするために生まれました。<br />
                    ジャンルを越えて、ひとの毎日と未来に、小さな革命を。
                </p>
            </FadeIn>
        </div>
    );
};

export default MissionSection;
