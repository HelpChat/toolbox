import {NextPage} from "next";

const UUIDConverter: NextPage = () => (
    <></>
);

async function getUserData(id: string): Promise<({ error: string } | {
    id: string;
    name: string;
    properties?: ({
        name: string;
        value: string;
        signature: string;
    })[];
})> {
    const data = await fetch(`https://crafthead.net/profile/${id}`)
    if (data.ok || data.status === 404) {
        return data.json()
    } else {
        return {
            error: "Failed to fetch user data"
        }
    }
}

export default UUIDConverter;
