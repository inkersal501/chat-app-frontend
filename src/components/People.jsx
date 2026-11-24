import { useEffect, useState } from "react";
import { connectJS } from "../js";
import { social, socialError } from "../js/social";

export default function People() {
    const [people, setPeople] = useState(null);
    const [requests, setRequests] = useState([]);
    const [username, setUsername] = useState("");
    const [query, setQuery] = useState("");
    const [report, setReport] = useState(null);
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const [revision, setRevision] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        Promise.all([
            social("/people", { params: { username: query }, signal: controller.signal }),
            connectJS.getRequests(),
        ]).then(([data, incoming]) => {
            if (!controller.signal.aborted) {
                setPeople(data);
                setRequests(incoming.requests ?? []);
            }
        }).catch((error) => {
            if (!controller.signal.aborted) setError(socialError(error));
        });
        return () => controller.abort();
    }, [query, revision]);

    async function run(action) {
        setBusy(true);
        setError("");
        try {
            await action();
            setRevision((value) => value + 1);
        } catch (error) {
            setError(socialError(error));
        } finally {
            setBusy(false);
        }
    }

    function privacyAction(kind, person, remove) {
        return () => social(`/${kind}/${person._id}`, { method: remove ? "DELETE" : "PUT" });
    }

    function personRow(person, friend) {
        const muted = people.muted.includes(person._id);
        return <li key={person._id} className="social-row">
            <strong>{person.username}</strong>
            {!friend && <button disabled={busy} onClick={() => run(() => connectJS.sendRequest(person._id))}>Add friend</button>}
            <button disabled={busy} onClick={() => run(privacyAction("mutes", person, muted))}>{muted ? "Unmute" : "Mute"}</button>
            <button disabled={busy} onClick={() => run(privacyAction("blocks", person, false))}>Block</button>
            <button disabled={busy} onClick={() => { setReport(person); setReason(""); }}>Report</button>
        </li>;
    }

    return <section className="social-panel">
        <h1>People</h1>
        {error && <p role="alert">{error}</p>}
        <form className="social-row" onSubmit={(event) => { event.preventDefault(); setQuery(username.trim()); setRevision((value) => value + 1); }}>
            <label htmlFor="people-search">Find by username</label>
            <input id="people-search" value={username} onChange={(event) => setUsername(event.target.value)} minLength={2} maxLength={40} required />
            <button>Search</button>
        </form>
        {people && <>
            {query && <section><h2>Search results</h2><ul>{people.results.map((person) => personRow(person, people.friends.some(({ _id }) => _id === person._id)))}</ul>{!people.results.length && <p>No matching accounts.</p>}</section>}
            <section><h2>Friend requests</h2><ul>{requests.map((person) => <li className="social-row" key={person._id}>
                <strong>{person.username}</strong>
                <button disabled={busy} onClick={() => run(() => connectJS.acceptRequest(person._id))}>Accept</button>
                <button disabled={busy} onClick={() => run(() => connectJS.declineRequest(person._id))}>Decline</button>
            </li>)}</ul>{!requests.length && <p>No pending requests.</p>}</section>
            <section><h2>Friends</h2><ul>{people.friends.map((person) => personRow(person, true))}</ul>{!people.friends.length && <p>Find someone by username to send a request.</p>}</section>
            <section><h2>Blocked accounts</h2><ul>{people.blocked.map((person) => <li className="social-row" key={person._id}>
                <strong>{person.username}</strong><button disabled={busy} onClick={() => run(privacyAction("blocks", person, true))}>Unblock</button>
            </li>)}</ul>{!people.blocked.length && <p>No blocked accounts.</p>}</section>
        </>}
        {report && <form className="social-card" onSubmit={(event) => {
            event.preventDefault();
            void run(async () => {
                await social("/reports", { method: "POST", data: { subject: report._id, reason } });
                setReport(null);
            });
        }}>
            <label htmlFor="report-reason">Report {report.username}</label>
            <textarea id="report-reason" value={reason} onChange={(event) => setReason(event.target.value)} maxLength={1000} required />
            <div className="social-row"><button disabled={busy}>Submit report</button><button type="button" onClick={() => setReport(null)}>Cancel</button></div>
        </form>}
    </section>;
}
