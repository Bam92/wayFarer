# User Story Template (to use on Pivotal Tracker)
## Template Structure
Title: [Persona name] should (not) be able to [overarching action]

_Business/User Value:_ As [persona] I want to [action by user] so that [value or need met]

_Acceptance Criteria_
GIVEN [necessary context and preconditions for story]
WHEN [action]
THEN [reaction]

**DEV NOTES**
[Relevant technical notes that developers may ask you to add to the story during weekly prep meeting (pre-IPM or IPM); sometimes they may add these themselves or add them as tasks]

**DESIGN Notes**
[prototype / design link inserted here; linking to a folder of a feature is good so designers can continue updating designs without anyone having to re-update the links to each design in the stories]

---other items that you may add to a story---

**NEEDS PM**
[Add reason for adding a label needs PM so you can view the story and remember context to unblock the story; usually this is some kind of thing we need to follow up with our client counterpart on]

**NEEDS DESIGN**
[Add reason for adding a label needs design so your designers can view the story and get context to unblock the story]

## Example
Title: User should be able to login

_Business/User Value:_ As a User, I should be able to login to the app so I can access my notifications/groups

_Acceptance Criteria_
GIVEN A user 
WHEN User navigates to the login page
THEN User should see a simple and descriptive form with username and password fields

**DEV NOTES**
User should be able to login through this form

**DESIGN Notes**
Simple and attractive UI
 

# Andela naming convention

### Branch Naming

Branches created should be named using the following format:

```
{story type}-{2-3 word summary}-{pivotal tracker id}
```

`story-type` - Indicates the context of the branch and should be one of:

- ft == Feature
- bg == Bug
- ch == Chore

`story-summary` - Short 2-3 words summary about what the branch contains

**Example**

```
ft-resources-rest-endpoints-111504508
```

### PR Naming

The PR title should be named using the following format:

```
#[STORY_ID] Story description
```

**Example**

```
#111504508 Build out REST Endpoints for Resources (CRUD)
```

### PR Description Template (Markdown)

The description of the PR should contain the following headings and corresponding content in Markdown format.

```md
#### What does this PR do?
#### Description of Task to be completed?
#### How should this be manually tested?
#### Any background context you want to provide?
#### What are the relevant pivotal tracker stories?
#### Screenshots (if appropriate)
#### Questions:
```

**Example**

![](https://github.com/andela/bestpractices/raw/master/img/git-naming.png)

### Commits

Atomic commits should be made with the format:

```
<type>(<scope>): <subject>``<BLANK LINE> <body> <BLANK LINE> <footer>

```

Any line cannot be longer than 100 characters, meaning be concise.

```<type>``` should be:

 * feature
 * bug
 * chore
 * release
 * refactor
 * documentation
 * style
 * test
        
 ```<scope>``` should be something specific to the commit change. For example:
        
costume
* flight
* fighting-style
* fan-base
* logo and so on.
     
```<subject>``` text should:
       
* use present tense: "save" not "saved" or "saving"
* not capitalize first letter i.e no "Carry to safety"
* not end with a dot (.)
            
**Message body (optional)** If a body is to be written, it should:
           
* written in present tense.
* include the reason for change and difference in the previous behaviour
              
**Message Footer** This should be used for referencing the issues using the following keywords: Start, Delivers, Fixes and Finishes. it should be inside a square bracket. Example:
                 
```
[Start #345]
```
                 
or in a case of multiple issues:
                 
```
[Finishes #5438233, #5891837, #4988398]
```
                 
## Example
               
chore(coveralls):add coveralls yml  
[Finishes #153742460]
