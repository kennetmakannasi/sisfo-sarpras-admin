import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";

export default function ExportData(props: any) {
    const token = localStorage.getItem("auth_token");

    async function tesdownload() {
        try {
            const res = await toast.promise(
                axios.get(`http://127.0.0.1:8000/api/admin/download/${props.endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: 'blob',
                }),
                {
                    loading: 'Downloading...',
                    success: <b>Excel Report downloaded!</b>,
                    error: <b>Failed to download</b>,
                }
            );

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${props.fileName}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error);
            toast.error("An error occurred while downloading.");
        }
    }

    return (
        <button
            onClick={tesdownload}
            className='flex h-10 justify-center items-center w-10 p-1 border-2 border-gray-200 hover:bg-gray-100 duration-150 transition-all shadow-md rounded-lg'
        >
            <Icon height={24} icon={'material-symbols:download-rounded'} />
        </button>
    );
}
