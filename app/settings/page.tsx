import FuzzyText from "@/components/custom/page";

export default function page(){

    return <div className="flex h-screen w-screen items-center justify-center bg-neutral-950">
        <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover
            >
             404
        </FuzzyText>
    </div>
}

