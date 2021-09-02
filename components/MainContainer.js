import Head from "next/head";

const MainContainer = ({children, meta_keywords = "", page_title, className}) => {
  return (
    <>
      <Head>
        <meta keywords={meta_keywords} />
        <title>{page_title}</title>
      </Head>
      <div className={className}>
        {children}
      </div>
    </>
  )
}

export default MainContainer