import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

export default function NewMeetupPage() {
    const router = useRouter();
    const meetHandler = async (edata) => {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(edata),
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        console.log(data);

        router.push("/");
    };

    return (
        <>
            <Head>
                <title>Add Meetups</title>
                <meta name="description" content="Add your own meetups!" />
            </Head>
            <NewMeetupForm onAddMeetup={meetHandler} />
        </>
    );
}
