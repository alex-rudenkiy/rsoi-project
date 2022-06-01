import Image from "next/image";

export default function NextImage({ src, width, height }) {
    const style = {
        paddingBottom: `min(350px, ${100 / (width / height)}%)`,
        objectFit: "contain",
        width: '100% !important',
        position: 'relative !important',
        height: 'unset !important'
    }

    return (
        <div className={`next-image-wrapper`} style={style}>
            <Image className="next-image" src={src} layout="fill" objectFit="contain" />
        </div>
    )
}
