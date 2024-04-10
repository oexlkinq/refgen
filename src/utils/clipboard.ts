export async function copyRich(rich: string, plain: string) {
    if (typeof ClipboardItem !== "undefined") {
        const html = new Blob([rich], { type: "text/html" });
        const text = new Blob([plain], { type: "text/plain" });
        const data = new ClipboardItem({ "text/html": html, "text/plain": text });
        await navigator.clipboard.write([data]);
    } else {
        const cb = (e: ClipboardEvent) => {
            if(!e.clipboardData){
                console.error('событие не содержит clipboardData');
                return;
            }

            e.clipboardData.setData("text/html", rich);
            e.clipboardData.setData("text/plain", plain);
            e.preventDefault();
        };
        document.addEventListener("copy", cb);
        document.execCommand("copy");
        document.removeEventListener("copy", cb);
    }
}
