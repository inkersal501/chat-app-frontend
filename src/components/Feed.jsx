import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import { social, socialError } from "../js/social";

const emojis = ["👍", "❤️", "😂", "🎉"];

function TextForm({ label, initial = "", maxLength, action, submit }) {
    const [value, setValue] = useState(initial);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    return <form className="social-card" onSubmit={async (event) => {
        event.preventDefault();
        setBusy(true);
        setError("");
        try {
            await action(value.trim());
            setValue("");
        } catch (error) {
            setError(socialError(error));
        } finally {
            setBusy(false);
        }
    }}>
        <label>{label}<textarea value={value} maxLength={maxLength} onChange={(event) => setValue(event.target.value)} required /></label>
        <button disabled={busy || !value.trim()}>{submit}</button>
        {error && <p role="alert">{error}</p>}
    </form>;
}

function Post({ post, userId, reload }) {
    const path = `/posts/${post._id}`;
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [next, setNext] = useState(null);
    const [reactions, setReactions] = useState({ counts: {}, mine: null });
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const [editor, setEditor] = useState(null);
    const [reporting, setReporting] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        social(path + "/reactions", { signal: controller.signal }).then(setReactions).catch((error) => {
            if (!controller.signal.aborted) setError(socialError(error));
        });
        return () => controller.abort();
    }, [path]);

    async function run(action) {
        setError("");
        setBusy(true);
        try {
            await action();
        } catch (error) {
            setError(socialError(error));
        } finally {
            setBusy(false);
        }
    }

    async function loadComments(before) {
        const result = await social(path + "/comments", { params: { before } });
        setComments((current) => before ? [...current, ...result.list] : result.list);
        setNext(result.nextCursor);
        setOpen(true);
    }

    const owned = post.author?._id === userId;
    return <article className="social-card">
        <div className="social-row"><strong>{post.author?.username || "Unavailable account"}</strong><time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleString()}</time></div>
        <p className="social-text">{post.text}</p>
        {error && <p role="alert">{error}</p>}
        <div className="social-row">
            {emojis.map((emoji) => <button key={emoji} aria-pressed={reactions.mine === emoji} disabled={busy} onClick={() => run(async () => {
                await social(path + "/reactions", { method: "PUT", data: { emoji: reactions.mine === emoji ? null : emoji } });
                setReactions(await social(path + "/reactions"));
            })}>{emoji} {reactions.counts[emoji] || ""}</button>)}
            <button disabled={busy} aria-expanded={open} onClick={() => open ? setOpen(false) : run(() => loadComments())}>Comments</button>
            {owned ? <>
                <button onClick={() => setEditor(editor === "post" ? null : "post")}>Edit</button>
                <button disabled={busy} onClick={() => {
                    if (window.confirm("Delete this post and its comments?")) void run(async () => {
                        await social(path, { method: "DELETE" });
                        reload();
                    });
                }}>Delete</button>
            </> : <button onClick={() => setReporting(!reporting)}>Report</button>}
        </div>
        {reporting && <TextForm label="Why are you reporting this post?" maxLength={1000} submit="Submit report" action={async (reason) => {
            await social("/reports", { method: "POST", data: { post: post._id, reason } });
            setReporting(false);
        }} />}
        {editor === "post" && <TextForm label="Edit post" initial={post.text} maxLength={4000} submit="Save" action={async (text) => {
            await social(path, { method: "PATCH", data: { text } });
            setEditor(null);
            reload();
        }} />}
        {open && <section className="social-comments">
            <TextForm label="Write a comment" maxLength={2000} submit="Comment" action={async (text) => {
                await social(path + "/comments", { method: "POST", data: { text } });
                await loadComments();
            }} />
            {comments.map((comment) => <div className="social-card" key={comment._id}>
                <strong>{comment.author?.username || "Unavailable account"}</strong>
                <p className="social-text">{comment.text}</p>
                {comment.author?._id === userId && <div className="social-row">
                    <button onClick={() => setEditor(editor === comment._id ? null : comment._id)}>Edit comment</button>
                    <button disabled={busy} onClick={() => run(async () => {
                        await social(path + "/comments/" + comment._id, { method: "DELETE" });
                        await loadComments();
                    })}>Delete comment</button>
                </div>}
                {editor === comment._id && <TextForm label="Edit comment" initial={comment.text} maxLength={2000} submit="Save" action={async (text) => {
                    await social(path + "/comments/" + comment._id, { method: "PATCH", data: { text } });
                    setEditor(null);
                    await loadComments();
                }} />}
            </div>)}
            {next && <button disabled={busy} onClick={() => run(() => loadComments(next))}>Older comments</button>}
        </section>}
    </article>;
}

function Timeline({ group, userId }) {
    const [posts, setPosts] = useState([]);
    const [next, setNext] = useState(null);
    const [revision, setRevision] = useState(0);
    const [status, setStatus] = useState("Loading posts…");
    const [busy, setBusy] = useState(false);
    const groupId = group?._id;
    const reload = () => setRevision((value) => value + 1);

    useEffect(() => {
        const controller = new AbortController();
        social("/posts", { params: { group: groupId }, signal: controller.signal }).then(({ list, nextCursor }) => {
            setPosts(list);
            setNext(nextCursor);
            setStatus(list.length ? "" : "No posts yet.");
        }).catch((error) => {
            if (!controller.signal.aborted) setStatus(socialError(error));
        });
        return () => controller.abort();
    }, [groupId, revision]);

    return <>
        <TextForm label={group ? `Post to ${group.name}` : "Share with friends"} maxLength={4000} submit="Post" action={async (text) => {
            await social("/posts", { method: "POST", data: { text, group: groupId } });
            reload();
        }} />
        {status && <p role="status">{status}</p>}
        {posts.map((post) => <Post key={post._id} post={post} userId={userId} reload={reload} />)}
        {next && <button disabled={busy} onClick={async () => {
            setBusy(true);
            try {
                const { list, nextCursor } = await social("/posts", { params: { group: groupId, before: next } });
                setPosts((posts) => [...posts, ...list.filter((post) => !posts.some(({ _id }) => _id === post._id))]);
                setNext(nextCursor);
            } catch (error) {
                setStatus(socialError(error));
            } finally {
                setBusy(false);
            }
        }}>Older posts</button>}
    </>;
}

export default function Feed() {
    const userId = useSelector(selectUser)?._id;
    const [groups, setGroups] = useState([]);
    const [friends, setFriends] = useState([]);
    const [activity, setActivity] = useState(null);
    const [groupId, setGroupId] = useState("");
    const [invite, setInvite] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const [revision, setRevision] = useState(0);
    const group = groups.find((group) => group._id === groupId && group.joined);

    useEffect(() => {
        const controller = new AbortController();
        const options = { signal: controller.signal };
        Promise.all([social("/groups", options), social("/people", options), social("/activity", options)])
            .then(([groups, people, activity]) => {
                setGroups(groups.groups);
                setFriends(people.friends);
                setActivity(activity);
            })
            .catch((error) => { if (!controller.signal.aborted) setError(socialError(error)); });
        return () => controller.abort();
    }, [revision]);

    async function change(path, method, data) {
        setBusy(true);
        setError("");
        try {
            await social(path, { method, data });
            setRevision((value) => value + 1);
        } catch (error) {
            setError(socialError(error));
        } finally {
            setBusy(false);
        }
    }

    const canManage = group && (group.owner === userId || group.admins.includes(userId));
    const groupPath = group && `/groups/${group._id}`;
    return <section className="social-panel">
        <h1>Feed</h1>
        <p>Share text with friends or a private group. Convo stores these posts on its server.</p>
        {error && <p role="alert">{error}</p>}
        <label className="social-row">Audience
            <select value={group ? groupId : ""} onChange={(event) => { setInvite(""); setGroupId(event.target.value); }}>
                <option value="">Friends</option>
                {groups.filter((group) => group.joined).map((group) => <option key={group._id} value={group._id}>{group.name}</option>)}
            </select>
        </label>
        {groups.filter((group) => group.invited && !group.joined).map((group) => <div className="social-card social-row" key={group._id}>
            <strong>Invitation to {group.name}</strong>
            <button disabled={busy} onClick={() => change(`/groups/${group._id}/membership`, "PUT")}>Join</button>
            <button disabled={busy} onClick={() => change(`/groups/${group._id}/members/${userId}`, "DELETE")}>Decline</button>
        </div>)}
        {activity && <details><summary>Recent activity</summary>
            <ul className="social-card">
                {activity.requests.map((person) => <li key={person._id}>{person.username} sent you a friend request. Open People to respond.</li>)}
                {activity.replies.map((reply) => <li key={reply._id}>{reply.author.username} commented on your post.</li>)}
                {!activity.requests.length && !activity.replies.length && <li>No recent activity.</li>}
            </ul>
        </details>}
        <details><summary>Private groups</summary>
            <TextForm label="Group name" maxLength={80} submit="Create group" action={async (name) => {
                const created = await social("/groups", { method: "POST", data: { name } });
                setGroupId(created._id);
                setRevision((value) => value + 1);
            }} />
            {group && <section className="social-card">
                <h2>{group.name} members</h2>
                {canManage && <div className="social-row">
                    <select aria-label="Friend to invite" value={invite} onChange={(event) => setInvite(event.target.value)}>
                        <option value="">Select a friend</option>
                        {friends.filter((friend) => !group.members.some((member) => member._id === friend._id)).map((friend) =>
                            <option key={friend._id} value={friend._id}>{friend.username}</option>)}
                    </select>
                    <button disabled={!invite || busy} onClick={() => change(`${groupPath}/invitations/${invite}`, "PUT")}>Invite</button>
                </div>}
                <ul>{group.members.map((member) => <li className="social-row" key={member._id}>
                    <strong>{member.username}</strong>
                    {member._id === group.owner ? "Owner" : group.admins.includes(member._id) ? "Admin" : "Member"}
                    {group.owner === userId && member._id !== userId && <button disabled={busy} onClick={() =>
                        change(`${groupPath}/admins/${member._id}`, "PUT", { admin: !group.admins.includes(member._id) })
                    }>{group.admins.includes(member._id) ? "Remove admin role" : "Make admin"}</button>}
                    {member._id !== group.owner && (canManage || member._id === userId) &&
                        <button disabled={busy} onClick={() => change(`${groupPath}/members/${member._id}`, "DELETE")}>
                            {member._id === userId ? "Leave group" : "Remove member"}
                        </button>}
                </li>)}</ul>
            </section>}
        </details>
        <Timeline key={group?._id || "friends"} group={group} userId={userId} />
    </section>;
}
