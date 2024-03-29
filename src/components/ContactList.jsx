import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ContactCard } from "./ContactCard";

const getAllContacts = () => {};

export function ContactList() {
  const supabaseClient = useSupabaseClient();

  const getAllContacts = () => {
    return supabaseClient
      .from("Contacts")
      .select("*")
      .then((response) => response.data);
  };
  const { data, isLoading, error } = useQuery(["contacts"], getAllContacts);

  return (
    <div>
      {isLoading && <div>Loading contacts</div>}

      {error && <div>Error loading contacts</div>}

      {data &&
        data.map((contact, index) => {
          return <ContactCard key={index} contact={contact} />;
        })}

      <Link href="/add" className="btn btn-primary mt-2">
        Add Contact
      </Link>
    </div>
  );
}
