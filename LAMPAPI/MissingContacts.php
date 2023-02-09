<?php

	$inData = getRequestInfo();

	$UserID = $inData["UserID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        // Gets the total number of contacts from specified user
		$stmt = $conn->prepare("Select COUNT(*) from Contacts where UserID=? AND Alive='missing'");
		$stmt->bind_param("s", $UserID );
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo($row['COUNT(*)']);
		}
		else
		{
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();

		/*// Gets number of dead contacts from specified user

		$stmt->bind_param("s", $UserID );
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
	  {
	      $Output .= '{"numDead":"' . $row["Count(*)"];
	  }
	  else
	  {
	    returnWithError("BAD BAD BAD");
	  }

        // Gets number of dead contacts from specified user
        $stmt = $conn->prepare("Select COUNT(*) from Contacts where UserID=? AND Alive='Alive'")
		$stmt->bind_param("s", $UserID );
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
	  {
	      $Output .= '{"numAlive":"' . $row["Count(*)"];
	  }
	  else
	  {
	    returnWithError("BAD BAD BAD");
	  }
		*/

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo($count)
	{
		$retValue = '{"Count":"' . $count . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
