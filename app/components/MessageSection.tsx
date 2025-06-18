import FadeIn from "./fadeIn";

const MessageSection = () => {
  return (
    <div className="p-8 flex items-center relative">
      <div className="w-max">
        <FadeIn delay={300}>
          <p className="text-white">
            あらゆる物事には、それを動かす「鍵」となるピースがある。<br />
            目立たなくても、最後の一手であり、つながりを生み、扉を開くキーでありたい。<br />
            私たちは、そんな存在でありたい。<br />
            人や社会、そして未来が動き出すその瞬間に、私たちがそこにいるように——。
          </p>
        </FadeIn>
      </div>
    </div>
  );
};

export default MessageSection;
