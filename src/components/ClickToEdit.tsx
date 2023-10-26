import { contactData } from "../domain/types";
import { ContactRow } from "./contacts/ContactRow";

export const ClickToEdit = ({
  contactsList,
  isEditing,
}: {
  contactsList: contactData[];
  isEditing: boolean;
}) => {
  return (
    <>
      {contactsList.slice(0, 3).map((contact, index) => (
        <ContactRow
          contact={contact}
          isEditing={isEditing}
          index={index}
          // key={contact.id}
        />
      ))}
    </>
  );
};
