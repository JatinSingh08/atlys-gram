export const notImplemented = (user: {email: string} | null) => () => {
    if (!user) return;
    alert("function not implemented");
    return;
} 

export function timeAgo(date: Date | string): string {
    const now = new Date();
    const created = date instanceof Date ? date : new Date(date);
    const diff = Math.floor((now.getTime() - created.getTime()) / 1000); 
  
    if (diff < 5) return "just now";
    if (diff < 60) return `${diff} sec${diff === 1 ? "" : "s"} ago`;
    if (diff < 3600) {
      const mins = Math.floor(diff / 60);
      return `${mins} min${mins === 1 ? "" : "s"} ago`;
    }
    if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }
    return created.toLocaleDateString();
  }