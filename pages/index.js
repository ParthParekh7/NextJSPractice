import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
export default function HomePage(props) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

// export async function getServerSideProps() {
//     return {
//         props: {
//             meetups: dummy,
//         },
//     };
// }

export async function getStaticProps() {
    const client = await MongoClient.connect("mongodb://localhost/dummy");
    const db = client.db();

    const meetupCollections = db.collection("meetups");
    const meetups = await meetupCollections.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map((i) => ({
                title: i.title,
                address: i.address,
                description: i.description,
                image: i.image,
                id: i._id.toString(),
            })),
        },
        revalidate: 1,
    };
}
