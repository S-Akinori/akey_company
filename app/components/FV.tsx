import FadeIn from "./fadeIn";

export const FV = () => {
  return (
    <div className="p-4 pl-12 flex items-center relative h-screen">
      <div className="p-4">
        <FadeIn delay={300}>
          <h1 className="text-white text-5xl font-bold">
            あらゆるモノ・コトの<br />
            鍵となれ
          </h1>
        </FadeIn>
        <div className="mt-4">
          <FadeIn delay={600}>
              <p className="text-white text-4xl font-bold">Be the Key to Everything</p>
          </FadeIn>
        </div>
      </div>
      <div className="p-4 text-lg mt-24">
        <FadeIn delay={1000}>
          <p className="text-white">
            あらゆる物事には、それを動かす"鍵"となるピースがある。<br />
            目立たなくても、最後の一手であり、つながりを生み、扉を開くキーでありたい。<br />
            私たちは、そんな存在でありたい。<br />
            人や社会、そして未来が動き出すその瞬間に、私たちがそこにいるように——。
          </p>
        </FadeIn>
      </div>
    </div>
  )
}

export default FV;