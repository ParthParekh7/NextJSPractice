import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
export default function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name="description"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    );
}
export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb://localhost/dummy");
    const db = client.db();

    const meetupCollections = db.collection("meetups");
    const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
    client.close();
    return {
        fallback: false,
        paths: meetups.map((i) => ({
            params: {
                meetupId: i._id.toString(),
            },
        })),
    };
}
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect("mongodb://localhost/dummy");
    const db = client.db();

    const meetupCollections = db.collection("meetups");
    const result = await meetupCollections.findOne({ _id: ObjectId(meetupId) });
    client.close();

    return {
        props: {
            meetupData: {
                id: result._id.toString(),
                title: result.title,
                address: result.address,
                description: result.description,
                image: result.image,
            },
        },
        revalidate: 10,
    };
}
