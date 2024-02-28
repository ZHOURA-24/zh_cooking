let path = './images'

export const setPathImage = (newPath: string) => {
    path = newPath
}

export const GetImage = (image: string) => {
    return `${path}/${image}.png`
}