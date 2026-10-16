# clean_names.py

def process_people(people):
    seen = set()              # keeps track of names already added
    unique_people = []        # final list without duplicates

    for person in people:
        name = person["name"]
        age = person["age"]
        profession = person["profession"]

        # make name lowercase so Alice and alice count as the same
        name_key = name.lower()

        if name_key not in seen:
            seen.add(name_key)        # remember this name
            person["name"] = name.capitalize()  # fix name formatting
            unique_people.append(person)        # add to final list

    return unique_people


# test data with duplicates and different capital letters
people_list = [
    {"name": "Alice", "age": 24, "profession": "Engineer"},
    {"name": "bob", "age": 30, "profession": "Designer"},
    {"name": "alice", "age": 24, "profession": "Engineer"},
    {"name": "Charlie", "age": 28, "profession": "Developer"},
    {"name": "BOB", "age": 30, "profession": "Designer"},
    {"name": "dave", "age": 35, "profession": "Manager"}
]

print("Original list:")
for p in people_list:
    print(p)

print("\nProcessed list:")
processed = process_people(people_list)
for p in processed:
    print(p)
