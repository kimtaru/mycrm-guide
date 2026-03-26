import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 bg-surface px-6 py-24 text-center">
      <h1 className="text-2xl font-bold text-on-surface">페이지를 찾을 수 없습니다</h1>
      <p className="max-w-md text-on-surface-variant">
        요청하신 주소에 해당하는 페이지가 없거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-gradient-to-r from-primary to-primary-container px-6 py-3 font-semibold text-on-primary"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
