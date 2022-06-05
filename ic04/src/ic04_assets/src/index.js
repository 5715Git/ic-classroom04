import { ic04 } from "../../declarations/ic04";
import { Agent, decodeIdentity } from "./agent";

async function load() {
    const pid = await ic04.pid();
    document.getElementById("greeting").innerText += "caller:" + pid + "\n";
    const ptype = await ic04.getType();
    document.getElementById("greeting").innerText +=
        "type:" + ptype.toString() + "\n";
    const greeting = await ic04.getApproved();
    document.getElementById("greeting").innerText +=
        "isVote:" + greeting + "\n";
    document.getElementById("greeting").innerText += "members:" + "\n";
    const mem = await ic04.getMemebers();
    document.getElementById("greeting").innerText += mem;

    let vote_button = document.getElementById("vote");
    vote_button.onclick = vote;

    let login_btn = document.getElementById("login_button");
    login_btn.onclick = loginII;
}

window.onload = load;

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let typeinput = document.getElementById("nameInput");
    await ic04.propose(typeinput.value);
    return false;
});

async function vote() {
    await ic04.vote();
}

async function loginII() {
    let login_btn = document.getElementById("login_button");
    await agent.ii_login(async () => {
        await refresh();
        show_account_id();
        if (!agent.is_authenticated()) {
            document.getElementById("banner_error").innerText =
                "Internet Identity login failed. Please try again later.";
        }
    });
}

var last_account_id;
function show_account_id() {
    let account_id = agent.account_id_hex();
    if (account_id != last_account_id) {
        last_account_id = account_id;
    }
}
